import { RedisConnection } from "bullmq";

export type ConnectionOptions = {
    host: string;
    port: number;
}

export const getConnection = (options: ConnectionOptions): RedisConnection => {
    const connection = new RedisConnection({...options});
    return connection;
}