import { BlobServiceClient, BlockBlobClient, ContainerClient, ContainerCreateResponse } from "@azure/storage-blob";
import dotenv from "dotenv"

dotenv.config({ path: "/Users/arnavnehra/dev/projects/Launch/upload-service/.env" });

const AZURE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

if(!AZURE_CONNECTION_STRING){
    throw Error("AZURE Connection String not found");
}
const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_CONNECTION_STRING 
)
      const containerName = "output"; 
      const containerClient = blobServiceClient.getContainerClient(containerName);

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


