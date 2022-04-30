/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';

export const protobufPackage = 'product';

export interface CreateProductRequest {
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface CreateProductResponse {
  status: number;
  error: string[];
  id: number;
}

export interface FindProductData {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
}

export interface FindProductRequest {
  id: number;
}

export interface FindProductResponse {
  status: number;
  error: string[];
  data: FindProductData | undefined;
}

export interface DecreaseStockRequest {
  id: number;
}

export interface DecreaseStockResponse {
  status: number;
  error: string[];
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  createProduct(
    request: CreateProductRequest,
  ): Observable<CreateProductResponse>;

  findProduct(request: FindProductRequest): Observable<FindProductResponse>;

  decreaseStock(
    request: DecreaseStockRequest,
  ): Observable<DecreaseStockResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
  ):
    | Promise<CreateProductResponse>
    | Observable<CreateProductResponse>
    | CreateProductResponse;

  findProduct(
    request: FindProductRequest,
  ):
    | Promise<FindProductResponse>
    | Observable<FindProductResponse>
    | FindProductResponse;

  decreaseStock(
    request: DecreaseStockRequest,
  ):
    | Promise<DecreaseStockResponse>
    | Observable<DecreaseStockResponse>
    | DecreaseStockResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createProduct',
      'findProduct',
      'decreaseStock',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
