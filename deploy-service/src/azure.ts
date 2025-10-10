import { BlobServiceClient, BlockBlobClient, ContainerClient, ContainerCreateResponse, ContainerListBlobsOptions } from "@azure/storage-blob";
import dotenv from "dotenv"
import path from "path";
import fs from "fs"
dotenv.config({ path: "/Users/arnavnehra/dev/projects/Launch/deploy-service/.env" });

const AZURE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

if(!AZURE_CONNECTION_STRING){
    throw Error("AZURE Connection String not found");
}
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_CONNECTION_STRING 
)
      const containerName = "output"; 
      const containerClient = blobServiceClient.getContainerClient(containerName);


export async function listBlobsFlat(
  prefix : string
){

    let files :string[] = [];

  const maxPageSize = 2;
  const listOptions: ContainerListBlobsOptions = {
    includeMetadata: true,
    includeSnapshots: true,
    prefix: prefix 
  };
  for await (const response of containerClient
    .listBlobsFlat(listOptions)
    .byPage({ maxPageSize })) {
    if (response.segment.blobItems) {
      for (const blob of response.segment.blobItems) {
        files.push(blob.name);
      }
    }
  }
  return files;
}

export async function downloadBlobs(files : string[]):Promise<void>{
  for (const file of files) {
    const blobClient = containerClient.getBlobClient(file);
    const filePath = path.join(__dirname, 'output', file);
    const dirName = path.dirname(filePath);
    
    if (!fs.existsSync(dirName)){
      fs.mkdirSync(dirName, { recursive: true });
    }
    
    await blobClient.downloadToFile(filePath); 

    console.log(`downloaded ${dirName} to ${filePath} \n`);
  }
}





