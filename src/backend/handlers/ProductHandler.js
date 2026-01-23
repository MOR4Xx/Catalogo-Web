import ProductRepository from "@/backend/repositories/ProductRepository";

export default class ProductHandler {
    constructor() {
        this.repository = new ProductRepository();
    }

    async createProduct(data) {



        return this.repository.create(data);
    }

    async findAll() {

        return this.repository.findAll();
    }
}
