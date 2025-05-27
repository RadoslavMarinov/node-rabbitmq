import amqp from "amqplib";
import { AbstractMessageBroker } from "./AbstractMessageBroker";

export class Subscriber extends AbstractMessageBroker {
  constructor(connectionURL?: string, queueName?: string) {
    super(connectionURL, queueName);
  }

  async connect() {
    await super.connect();
    this.channel.consume(this.queueName, (msg) => {
      const { content } = msg!;
      console.log(
        `Message arrived: queue: ${
          this.queueName
        }, message: ${content.toString()}`
      );
    });
  }
}

interface SubscriberProps {
  connectionURL: string;
  queueName: string;
}
