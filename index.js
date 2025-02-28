const { createClient } = require("@redis/client");

(async () => {
  const client = createClient();

  // Redis 서버 연결
  await client.connect();
  client.on("error", (err) => console.err("Redis Client Error", err));

  try {
    // Redis 명령어 실행
    await client.set("mykey", "Hello Redis");
    const value = await client.get("mykey");
    console.log(value); // "Hello, Redis!"

    // 키 삭제
    await client.del("mykey");
  } catch (err) {
    console.error("Error executing Redis command", err);
  } finally {
    // 클라이언트 종료
    await client.quit();
  }
})();
