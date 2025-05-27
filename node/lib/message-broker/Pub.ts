import amqp from "amqplib/callback_api";
import { AbstractMessageBroker } from "./AbstractMessageBroker";

export class Publisher extends AbstractMessageBroker {
  constructor(connectionURL?: string, queueName?: string) {
    super(connectionURL, queueName);
  }

  async sendMessage(message: string): Promise<void> {
    try {
      await this.connect();
      this.channel.sendToQueue(this.queueName, Buffer.from(message), {
        persistent: true,
      });
      console.log(`Message sent to queue ${this.queueName}: ${message}`);
    } catch (error) {
      console.error(
        `Failed to send message to queue ${this.queueName}:`,
        error
      );
      throw error;
    }
  }
}
