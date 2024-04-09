import Redis from "ioredis";

const redis = new Redis(
  "rediss://default:5e69014f4987428e85a4b63020611bb6@eu1-solid-yeti-39759.upstash.io:39759"
);

export default redis;
