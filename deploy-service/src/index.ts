import { createClient } from "redis";
import { downloadBlobs, listBlobsFlat } from "./azure";
import buildProject, { copyDist } from "./utils";

const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main(){
    while(1){
        const res = await subscriber.brPop(
            'build-queue',0
        )
        const id = res?.element || ""
        console.log(id);
        
        const files = await listBlobsFlat(id);
        await downloadBlobs(files);
        await buildProject(id);
        await copyDist(id);
        publisher.hSet("status",id,"downloaded");
    }
}

main();
