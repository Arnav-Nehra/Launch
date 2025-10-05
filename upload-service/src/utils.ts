import fs from "fs"
import path from "path";

export function generateProjectId() {
  let dict = "123456789qwertyuiopasdfghjklzxcvbnm";
  let ans = "";
  for (let i = 0; i < 8; i++) {
    ans += dict[Math.floor(Math.random() * dict.length)];
  }
  return ans;
}

export const getAllFiles = (folderPath:string)=>{
  let response : string[] = [];
  const allFilesandFolders = fs.readdirSync(folderPath);
  allFilesandFolders.forEach(file=>{
    const fullFilePath = path.join(folderPath,file);
    if(fs.statSync(fullFilePath).isDirectory()){
      response = response.concat(getAllFiles(fullFilePath))
    }
    else{
      response.push(fullFilePath)
    }

  })
  return response;
} 