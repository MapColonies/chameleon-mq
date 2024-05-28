import { Job, JobsOptions, Queue, RedisConnection,QueueOptions } from 'bullmq';
import { getConnection, ConnectionOptions } from './connection';
import { TaskEventMessage } from '@map-colonies/export-interfaces';

export type QueueMessage = { name: string, data: TaskEventMessage };
export type BackoffOptions = Pick<JobsOptions, 'attempts' | 'backoff' | 'delay' | 'priority' | 'removeOnFail'>;
//export type JobsOptions = { attemtps: number, backoff: BackoffOptions };
export class QueueManager {
  private readonly queue: Queue;
  private readonly topic: string;
  private readonly connectionOptions: ConnectionOptions;
  public constructor(topic: string, connectionOptions: ConnectionOptions) {
    this.topic = topic;
    this.connectionOptions = connectionOptions;
    this.queue = new Queue(this.topic, {connection: this.connectionOptions});
  }

  public async publish(message: QueueMessage, options?: BackoffOptions): Promise<Job> {
    try {
      console.log("$$$$",await this.queue.getFailedCount());
      const result = await this.queue.add(message.name, message.data, options);
      return result;
    }
    catch (error) {
      console.error('error', error);
      throw new Error((error as Error).message);
    }

  }

  public async publishBulk(messages: QueueMessage[]): Promise<Job[]> {
    try {
      const result = await this.queue.addBulk(messages)
      return result;
    } catch (error) {
      console.error('error', error);
      throw new Error((error as Error).message);
    }
  }
}
