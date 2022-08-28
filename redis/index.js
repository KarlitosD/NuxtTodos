import Redis from "ioredis"
import JSONCache from 'redis-json'

const { redisUri } = useRuntimeConfig()

const client = new Redis(redisUri)
const jsonCache = new JSONCache(client)

export default jsonCache
