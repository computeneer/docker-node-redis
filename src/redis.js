const redis = require("redis");

class RedisClient {
  constructor(client) {
    this.client = redis.createClient({
      url: client,
    });
    this.client.connect();
    this.client.on("error", (error) => {
      console.error("Redis Connection Error", error);
    });
  }

  async setValue(key, value) {
    return await this.client.set(key, JSON.stringify(value));
  }

  async getValue(key) {
    return JSON.parse(await this.client.get(key));
  }

  async removeKey(key) {
    return await this.client.del(key);
  }

  async flush() {
    return await this.client.flushAll();
  }
}

module.exports = RedisClient;
