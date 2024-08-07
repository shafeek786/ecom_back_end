import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/DTO/product.dto';
import { Product } from 'src/Schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addProduct(
    data: CreateProductDto,
    productImage: Express.Multer.File,
  ): Promise<{ success: boolean; message: string }> {
    try {
      console.log('product:', data);
      const baseUrl = `http://localhost:3000`;
      const productImageUrl = `${baseUrl}/uploads/${productImage.filename}`; // Construct image URL

      const product = new this.productModel({
        ...data,
        propic: productImageUrl,
      });
      await product.save();
      console.log('product:', product);

      return { success: true, message: 'Product added successfully' };
    } catch (err) {
      return { success: false, message: 'Error adding product' };
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (err) {
      throw new Error('Error retrieving product');
    }
  }

  async getAllProducts(): Promise<{ success: boolean; products: Product[] }> {
    try {
      console.log('productss');
      const products = await this.productModel.find().exec();
      console.log(products);
      return { success: true, products: products };
    } catch (err) {
      throw new Error('Error retrieving products');
    }
  }
}
