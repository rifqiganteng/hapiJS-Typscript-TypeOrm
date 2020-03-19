import * as redis from "redis"



const {REDIS_HOST, REDIS_PORT, REDIS_DB} = process.env
export default class RedisService {
    constructor() {
        console.log("redis db", process.env.REDIS_DB);
        this.client = redis.createClient({
             host: REDIS_HOST,
             port: REDIS_PORT,
             db: REDIS_DB
        })
    }

    get(key: any) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (error, value) => {
                if (error) {
                    reject(error);
                }
                resolve(value);
            })
        })
    }

    async set({key, value, expires}) {
        await this.client.set(key, value);
        if (expires) {
            await this.client.expire(key, expires);
        }
    }
}