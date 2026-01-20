
import ProductRepository from "@/backend/repositories/ProductRepository";

export default class ProductHandler {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(user, product) {
        if (!product.title || !product.price) {
            throw new Error("Dados inválidos");
        }

        return this.productRepository.create(product);
    }
}