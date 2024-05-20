import { Job, Queue, RedisConnection, Worker } from 'bullmq';
import { getConnection, ConnectionOptions } from './connection';

export class WorkerManager {
  private readonly worker: Worker;
  private readonly connectionOptions: ConnectionOptions;
  public constructor(topic: string, workerJobHandler: (job: Job) => Promise<void>, connectionOptions: ConnectionOptions) {
    this.connectionOptions = connectionOptions;
    this.worker = new Worker(topic, workerJobHandler, { connection: this.connectionOptions, autorun: false });
  }

  public async subscribe(): Promise<void> {
    try {
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
}

export {Job, Queue}