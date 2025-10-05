import express from "express";
import cors from "cors";
import { generateProjectId, getAllFiles } from "./utils";
import {simpleGit} from "simple-git";
import path from "path"
import { uploadBlobFromLocalPath } from "./azure";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/upload", async(req, res) => {
  const githubUrl = req.body.githubUrl;
  const id = generateProjectId();

await simpleGit().clone(githubUrl,path.join(__dirname,`output/${id}`));

const files = getAllFiles(path.join(__dirname,`output/${id}`)) 

files.forEach(async file=>{
  await uploadBlobFromLocalPath(file.slice(__dirname.length+8),file)    
})

res.json("completed")
});

app.listen(3000);