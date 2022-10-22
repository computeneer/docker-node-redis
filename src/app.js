const express = require("express");
const Redis = require("./redis");
const dotenv = require("dotenv");

dotenv.config();
const redisClient = new Redis(
  process.env.REDIS_HOST || "redis://127.0.0.1:6379"
);
const app = express();
app.use(express.json());
const PORT = process.env.PORT ?? 8080;

app.get("/", (req, res) => {
  console.log("Is docker easy? 🐋");
  res.status(200).send("You have reached 🐳");
});

app.get("/ping/redis", async (req, res) => {
  const date = new Date();
  const data = {
    connected: true,
    date: date.toDateString(),
  };
  await redisClient.setValue("connection", data);
  res.status(200).send(data);
});

app.get("/redis/:key", async (req, res) => {
  const data = await redisClient.getValue(req.params.key);
  res.status(200).send(data);
});

app.get("/redis/del/all", async (req, res) => {
  const data = await redisClient.flush();
  res.status(200).send(data);
});

app.listen(PORT, () => console.warn(`App is listening ${PORT}`));
