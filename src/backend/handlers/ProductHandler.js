import ProductRepository from "@/backend/repositories/ProductRepository";

export default class ProductHandler {
    constructor() {
        this.repository = new ProductRepository();
    }

    async createProduct(data) {
        if (!data.name || !data.price || !data.category) {
            throw new Error("Dados obrigatórios não preenchidos");
        }

        if (data.price <= 0) {
            throw new Error("Preço inválido");
        }

        return this.repository.create(data);
    }
}
