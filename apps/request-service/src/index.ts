import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "/Users/arnavnehra/dev/projects/Launch/request-service/.env" });

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error("Connection String not Found");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

const app = express();

app.get("/{*any}", async (req, res) => {
  const host = req.hostname;
  const id = host.split(".")[0];
  const filePath = req.path;

  const containerName = "build";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = await containerClient.getBlobClient(`${id}/dist${filePath}`);
  const content = await blobClient.downloadToBuffer();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
      ? "text/css"
      : "application/javascript";
  res.set("Content-Type", type);
  res.send(content.toString());
});

app.listen(3001);
