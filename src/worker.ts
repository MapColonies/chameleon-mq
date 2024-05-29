import { Job, Queue, QueueEvents, QueueGetters, RedisConnection, Worker } from 'bullmq';
import { getConnection, ConnectionOptions } from './connection';
import { Jobs } from './queueManager';

export class WorkerManager<T> {
  private readonly worker: Worker<T>;
  private readonly queueGetters: QueueGetters<T, any, any>;
  private readonly connectionOptions: ConnectionOptions;
  public constructor(topic: string, workerJobHandler: (job: Job) => Promise<void>, connectionOptions: ConnectionOptions) {
    this.connectionOptions = connectionOptions;
    this.worker = new Worker(topic, workerJobHandler, { connection: this.connectionOptions, autorun: false, concurrency: 1 });
    this.queueGetters = new QueueGetters<T,any,any>(topic, {connection: connectionOptions});
    this.retryOnFailed(8000);
  }

  public retryOnFailed(retryDealyMs: number): void {
    this.worker.on('failed', async (job: Job<any, any, string> | undefined) => {
      try {
        const isFailed = await job?.isFailed();
        if (isFailed) {
          setTimeout(async () => {
            console.log(`found failed job: ${job?.id} trying to retry.`);
            await job?.retry('failed');
          },
            retryDealyMs)
        }

      } catch (error) {
        console.log("ERROR")
      }
    })
  }
  
  public async subscribe(): Promise<void> {
    try {
      await this.handleFailedJobs();
      await this.worker.run();
      }
      catch (error) {
        console.error('error', error);
        throw new Error((error as Error).message);
      }
    }

    public async pause(): Promise<void> {
      try {
        await this.worker.pause();
      } catch (error) {
        console.error('error', error);
        throw new Error((error as Error).message);
      }
    }
    
    public async handleFailedJobs(): Promise<void> {
      const failedJobs = await this.queueGetters.getFailed();
      console.log("Failedjob", failedJobs.length)
      for (const failedJob of failedJobs) {
        failedJob.retry();
      }
    }
  }
  
export { Job, Queue }