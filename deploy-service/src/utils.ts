import { exec } from "child_process";
import path from "path";
import dotenv from 'dotenv'
import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";
import fs from "fs"


dotenv.config({ path: "/Users/arnavnehra/dev/projects/Launch/upload-service/.env" });
const AZURE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING



if (!AZURE_CONNECTION_STRING) {
  throw Error("Azure Connection String not found");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_CONNECTION_STRING
)

const containerName = "build";
const containerClient = blobServiceClient.getContainerClient(containerName);




export default function buildProject(id: string) {
  const dwnldPath = path.join(__dirname, `output/${id}`);

  return new Promise<void>((resolve, reject) => {
    const cmd = `
      docker rm -f ${id} 2>/dev/null || true && \
      docker run -dit --name ${id} node:18 bash && \
      docker cp ${dwnldPath} ${id}:/app && \
      docker exec ${id} bash -c "cd /app && npm install && npm run build" && \
      (docker cp ${id}:/app/dist ${dwnldPath}/dist 2>/dev/null || docker cp ${id}:/app/build ${dwnldPath}/build) && \
      docker rm -f ${id}
    `;

    const child = exec(cmd);

    child.stdout?.on("data", (data) => console.log("stdout:", data));
    child.stderr?.on("data", (data) => console.log("stderr:", data));

    child.on("close", (code) => {
      console.log(`Docker process exited with code ${code}`);
      resolve();
    });

    child.on("error", (err) => reject(err));
  });
}


const getAllFiles = (folderPath: string) => {
  let response: string[] = [];
  const allFilesandFolders = fs.readdirSync(folderPath);
  allFilesandFolders.forEach(file => {
    const fullFilePath = path.join(folderPath, file);
    if (fs.statSync(fullFilePath).isDirectory()) {
      response = response.concat(getAllFiles(fullFilePath))
    }
    else {
      response.push(fullFilePath)
    }

  })
  return response;
}

export async function uploadBlobFromLocalPath(
  blobName: string,
  localFilePath: string
): Promise<void> {
  const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(localFilePath);

  for await (const blob of containerClient.listBlobsFlat()) {
    // Get Blob Client from name, to get the URL
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

    // Display blob name and URL
    console.log(
      `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
    );
  }
}

export async function copyDist(id: string) {

  const buildPath = path.join(__dirname, 'output', id, 'dist')
  const files = getAllFiles(buildPath);

  await Promise.all(
    files.map(async (file) => {
      await uploadBlobFromLocalPath(file.slice(__dirname.length + 8), file)
    })).then(() => console.log("dist uploaded")).catch(()=>console.error("failed uploading dist"));
}