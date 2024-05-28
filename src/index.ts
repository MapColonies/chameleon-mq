import { Job } from "bullmq";
import { ConnectionOptions } from "./connection";
import { QueueManager } from "./queue";
import { TaskCompletedMessage, TaskEvent, TaskStatus } from "@map-colonies/export-interfaces";

// const connection: ConnectionOptions = { host: '10.45.148.24', port: 6379 };
// const queue = new QueueManager('topic1', connection);
// export declare enum ArtifactRasterType {
//     GPKG = "GPKG",
//     LEGEND = "LEGEND",
//     METADATA = "METADATA",
//     THUMBNAILS_SMALL = "THUMBNAILS_SMALL",
//     THUMBNAILS_MEDIUM = "THUMBNAILS_MEDIUM",
//     THUMBNAILS_LARGE = "THUMBNAILS_LARGE"
// }
// const taskCompletedMessage = {
//     status: TaskStatus.COMPLETED,
//     customerName: 'unknown',
//     domain: "RASTER",
//     jobId: 'fd6bd061-0a31-4c2b-a074-81fe37d1831d',
//     finishedAt: new Date(),
//     progress: 100,
//     artifacts: [{ name: 'artifact.gpkg', size: 5864, type: ArtifactRasterType.GPKG, url: "localhost:8080/download", sha256: 'dsf4t45gf-t65-dfg5r55' }],
//     event: TaskEvent.TASK_COMPLETED
// }
// const message = 
// void queue.publish({name: taskCompletedMessage.event, data: taskCompletedMessage});
// console.log("DONE")

// const workerJobHandler = async (job: Job): Promise<void> => {
//     console.log("TEST HANDLER: ", job.name);
// }
// const worker = new WorkerManager('topic1', workerJobHandler, connection);
// void worker.subscribe();
// void worker.pause();

console.log("DONE")
console.log("SSDSDF")



