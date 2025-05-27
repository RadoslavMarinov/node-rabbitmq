import amqp from "amqplib";

export class AbstractMessageBroker {
  protected channel: amqp.Channel;
  protected connection: amqp.ChannelModel;

  constructor(
    protected connectionURL: string = "amqp://localhost:5672",
    protected queueName: string = "default"
  ) {}

  async connect() {
    if (this.connection && this.channel) {
      return; // Already connected
    }

    try {
      this.connection = await amqp.connect(this.connectionURL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: false });
    } catch (error) {
      throw error;
    }
  }

  async close() {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
  }
}
