import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from 'src/DTO/product.dto';
import { multerConfig } from 'src/path-to/multer.config';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roleGaurd';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('addproduct')
  @Roles('vendor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('productImage', multerConfig))
  async addProduct(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5e6 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    profileImage: Express.Multer.File,
    @Body() data: CreateProductDto,
  ): Promise<{ success: boolean; message: string }> {
    console.log('add product', data, profileImage);
    return this.productService.addProduct(data, profileImage);
  }

  @Get()
  async getProducts() {
    return this.productService.getAllProducts();
  }
}
