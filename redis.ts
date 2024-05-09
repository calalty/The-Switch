import Redis from "ioredis";
import { env } from "process";

const redis = new Redis(`${env.NEXT_PUBLIC_REDIS_URL}`);

export default redis;
