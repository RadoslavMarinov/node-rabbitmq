import { Publisher } from "./lib/message-broker/Pub.js";
import { Subscriber } from "./lib/message-broker/Sub.js";

console.log(`👉 Hello = `);

const sub = new Subscriber();
await sub.connect();

const pub = new Publisher();
await pub.connect();

await pub.sendMessage("Hello World!");

setTimeout(async () => {
  console.log(`🚀 Timeout `);
  await sub.close();
  await pub.close();
}, 5000);

export {};
