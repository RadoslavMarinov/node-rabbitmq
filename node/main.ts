import { Publisher } from "./lib/message-broker/Pub.js";
import { Subscriber } from "./lib/message-broker/Sub.js";

console.log(`👉 Hello = `);

const sub = Subscriber.connect();

const pub = new Publisher("hello");
await pub.connect();
pub.sendMessage("Hello World!");

export {};
