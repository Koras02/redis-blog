// node-js setting
const express = require("express");
const { createClient } = require("redis");

const app = express();
const PORT = 3000;

// 비동기 클라이언트 생성
const client = createClient();

client.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

app.use(express.json());

// Redis 클라이언트 연결
(async () => {
  await client.connect();
})();

// CRUD setting

// Create
app.post("/data", async (req, res) => {
  const { key, value } = req.body;
  try {
    await client.set(key, value);
    res.send("Data create Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get("/data/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const value = await client.get(key);
    res.send(value);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete("/data/:key", async (req, res) => {
  const { key } = req.params;
  try {
    await client.del(key);
    res.send("Data deleted Successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
