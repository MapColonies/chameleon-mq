import { Job } from "bullmq";
import { ConnectionOptions } from "./connection";
import { QueueManager } from "./queue";



const connection: ConnectionOptions = { host: '10.45.148.24', port: 6379 };
const queue = new QueueManager('topic1', { host: '10.45.148.24', port: 6379 });
queue.publish({ data: {test: "test"}, name: 'TASK_COMPLETED' })
console.log("DONE")

// const workerJobHandler = async (job: Job): Promise<void> => {
//     console.log("TEST HANDLER: ", job.name);
// }
// const worker = new WorkerManager('topic1', workerJobHandler, connection);
// void worker.subscribe();
// void worker.pause();

console.log("DONE")
console.log("SSDSDF")



