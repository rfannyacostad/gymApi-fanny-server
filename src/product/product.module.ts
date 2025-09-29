import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketsGateway } from 'src/socket/gateway';
import { AppGateway } from 'src/app.gateway';
import { Category } from 'src/category/category.entity';
import { ImageService } from 'src/image/imgCustom';

@Module({
  providers: [
    ProductResolver,
    ProductService,
    WebsocketsGateway,
    AppGateway,
    ImageService, // 👈 tiene que estar aquí
  ],
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
  ],
})
export class ProductModule {}
