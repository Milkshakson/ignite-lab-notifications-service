import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['beloved-wallaby-8418-us1-kafka.upstash.io:9092'],

        sasl: {
          mechanism: 'scram-sha-256',

          username: process.env.UPSTASH_USER || '',

          password: process.env.UPSTASH_PASSWORD || '',
        },

        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
