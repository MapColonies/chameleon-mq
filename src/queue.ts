import { Job, Queue, RedisConnection } from 'bullmq';
import { getConnection, ConnectionOptions } from './connection';
import {EventMessage} from '@map-colonies/export-interfaces';

export type QueueMessage = { name: string, data: EventMessage };
export class QueueManager {
    private readonly queue: Queue;
    private readonly topic: string;
    private readonly connection: RedisConnection;
    public constructor(topic: string, connectionOptions: ConnectionOptions) {
        this.topic = topic;
        this.queue = new Queue(this.topic);
        this.connection = getConnection(connectionOptions)
    }
    
    public async publish(message: QueueMessage): Promise<Job> {
        try {
            const result = await this.queue.add(message.name, message.data);
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
