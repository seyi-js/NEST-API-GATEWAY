import { Module } from '@nestjs/common';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrderController } from './order.controller';
import { ORDER_PACKAGE_NAME, ORDER_SERVICE_NAME } from './order.pb';

const options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50052',
    package: ORDER_PACKAGE_NAME,

    protoPath: join(process.cwd(), '/src/order/order.proto'),
  },
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        ...options,
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
