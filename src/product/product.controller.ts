import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateProductRequest,
  CreateProductResponse,
  FindProductResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
} from './product.pb';

@Controller('product')
export class ProductController {
  private svc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createProduct(
    @Body() body: CreateProductRequest,
  ): Promise<Observable<CreateProductResponse>> {
    return this.svc.createProduct(body);
  }

  @Get(':id')
  private async login(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Observable<FindProductResponse>> {
    return this.svc.findProduct({ id });
  }
}
