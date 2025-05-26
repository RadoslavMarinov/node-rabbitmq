import amqp from "amqplib/callback_api";

export class Publisher {
  private connectionURL: string = "amqp://localhost:5672"; // Default RabbitMQ URL

  constructor(public queueName: string, private channel: any = null) {}

  async connect() {
    const self = this;
    return new Promise<void>((resolve, reject) => {
      if (!self.channel) {
        amqp.connect(self.connectionURL, function (error0, connection) {
          if (error0) {
            return reject(error0);
          }
          connection.createChannel(function (error1, channel) {
            if (error1) {
              return reject(error1);
            }

            var msg = "Hello World!";

            channel.assertQueue(self.queueName, {
              durable: false,
            });
            channel.sendToQueue(self.queueName, Buffer.from(msg));
            console.log(` [x] Sent ${msg}`);
            self.channel = channel;
            resolve(self.channel);
          });
        });
      }
    });
  }

  async sendMessage(message: string): Promise<void> {
    await this.connect();

    try {
      this.channel.assertQueue(this.queueName, { durable: true });
      this.channel.sendToQueue(this.queueName, Buffer.from(message), {
        persistent: true,
      });
      console.log(`Message sent to queue ${this.queueName}: ${message}`);
    } catch (error) {
      console.error(
        `Failed to send message to queue ${this.queueName}:`,
        error
      );
    }
  }
}
