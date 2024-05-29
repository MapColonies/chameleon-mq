import { Job, JobsOptions, Queue, RedisConnection, QueueOptions, QueueGetters, QueueBase, QueueEvents } from 'bullmq';
import { getConnection, ConnectionOptions } from './connection';
import { TaskEventMessage } from '@map-colonies/export-interfaces';

export class QueueManager<T> {
  private readonly queueGetters: QueueGetters<T, any, any>;
  public constructor(topic: string, connectionOptions: ConnectionOptions) {
    this.queueGetters = new QueueGetters(topic, { connection: connectionOptions });
    
  }
  
  public async getFailedJobs(): Promise<Jobs> {
    const failedJobs = await this.queueGetters.getFailed();
    console.log("failed jobs:", failedJobs.length);
    return failedJobs?? undefined;
    if (failedJobs.length > 0) {
      await failedJobs[0].retry();
      return failedJobs;
    }
  }
}

export type Jobs = Job<any, any, any>[];