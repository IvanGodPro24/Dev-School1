import { Body, Controller, Get, Post, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { EntityNotFoundException } from '../Exceptions/NotFoundException';
import { EntityExistsValidationPipe } from '../Exceptions/EntityExistsValidationPipe';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Patch(':productId')
    @UsePipes(new ValidationPipe({ transform: true }))
    updateProduct(@Param('productId', EntityExistsValidationPipe) productId: number, @Body() updateProductDto: UpdateProductDto) {
        const updatedProduct = this.productService.updateProduct(productId, updateProductDto);
        if (!updatedProduct) {
            throw new EntityNotFoundException('Product', productId);
        }
        return updatedProduct;
    }

    @Delete(':productId')
    deleteProduct(@Param('productId', EntityExistsValidationPipe) productId: number) {
        const deletedProduct = this.productService.deleteProduct(productId);
        if (!deletedProduct) {
            throw new EntityNotFoundException('Product', productId);
        }
        return deletedProduct;
    }
}
