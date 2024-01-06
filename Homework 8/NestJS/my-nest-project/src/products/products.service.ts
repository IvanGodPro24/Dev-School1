import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductService {
    private products = [];

    createProduct(createProductDto: CreateProductDto) {
        const newProduct = { id: this.products.length + 1, ...createProductDto };
        this.products.push(newProduct);
        return newProduct;
    }

    getAllProducts() {
        return this.products;
    }

    updateProduct(productId: number, updateProductDto: UpdateProductDto) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updateProductDto };
            return this.products[productIndex];
        }
        return null;
    }

    deleteProduct(productId: number) {
        const productIndex = this.products.findIndex((product) => product.id === productId);
        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            return deletedProduct;
        }
        return null;
    }
}
