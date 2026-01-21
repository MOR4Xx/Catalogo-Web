import ProductRepository from "@/backend/repositories/ProductRepository";
import Product from "@/backend/models/Produto";

export default class ProductHandler {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(product) {
        console.log("Chegou no Handler");
        // garante domínio
        if (!(product instanceof Product)) {
            throw new Error("Produto inválido");
        }

        // regra de negócio (exemplo)
        if (product.price < 1) {
            throw new Error("Preço mínimo inválido");
        }

        console.log("Passou para o repository");
        return this.productRepository.create(product);
    }
}
