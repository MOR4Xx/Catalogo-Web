import ProductRepository from "@/backend/repositories/ProductRepository";
import ImageService from "@/backend/repositories/ImageService";
import Product from "@/backend/models/Produto";

export default class ProductService {
    constructor() {
        this.repository = new ProductRepository();
        this.imagesService = new ImageService();
    }

    async createProduct(formData) {

        const imageFile = formData.get("image");

        let urlImage = null

        if (imageFile) {
            urlImage = await this.imagesService.upload(imageFile);
        }

        if (!urlImage) {
            const dto = {
                name: formData.get("name"),
                price: Number(formData.get("price")),
                category: formData.get("category"),
                description: formData.get("description"),
                url_image: urlImage,
            };

            const product = new Product(dto);
            return this.repository.create(product);
        }
    }

    async findAll() {
        return this.repository.findAll();
    }

    async editProduct(id, data) {
        return this.repository.editProduct(id, data);
    }

    async deleteProduct(id) {

        return this.repository.delete(id);
    }

    async search(search) {
        const produtos = await this.repository.searchProduct(search);

        return produtos;
    }
}
