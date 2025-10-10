import express from "express";
import cors from "cors";
import { generateProjectId, getAllFiles } from "./utils";
import { simpleGit } from "simple-git";
import path from "path"
import { uploadBlobFromLocalPath } from "./azure";
import { createClient } from "redis";

const app = express();

const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();


app.use(express.json());
app.use(cors());

app.post("/upload", async (req, res) => {
  const githubUrl = req.body.githubUrl;
  const id = generateProjectId();

  await simpleGit().clone(githubUrl, path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`))


  await Promise.all(
    files.map(async (file) => {
      await uploadBlobFromLocalPath(file.slice(__dirname.length + 8), file)
    })
  ).then(() => {
    publisher.lPush("build-queue", id)
    publisher.hSet("status", id, "uploaded");
  })

  res.json(`completed ${id}`)
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
    status: response
  })
})

app.listen(3000);