import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorService } from './vendor.service';
import { Product, ProductSchema } from 'src/Schemas/product.schema';
import { User, UserSchema } from 'src/Schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [VendorService],
  controllers: [VendorController],
})
export class VendorModule {}
