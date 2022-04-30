import { Module } from '@nestjs/common';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductController } from './product.controller';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './product.pb';

const options: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50053',
    package: PRODUCT_PACKAGE_NAME,

    protoPath: join(process.cwd(), '/src/product/product.proto'),
  },
};
@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        ...options,
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
