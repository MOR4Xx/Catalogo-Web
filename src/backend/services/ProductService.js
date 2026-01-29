import ProductRepository from "@/backend/repositories/ProductRepository";
import ImageService from "@/backend/services/ImageService";
import Product from "@/backend/models/Produto";
import {NextResponse} from "next/server";

export default class ProductService {
    constructor() {
        this.repository = new ProductRepository();
        this.imagesService = new ImageService();
    }

    async createProduct(formData) {

        const imageFile = formData.get("image");

        let uploadedImage  = null

        if (imageFile) {
            uploadedImage = await this.imagesService.upload(imageFile);
        }

        const dto = {
            name: formData.get('name'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            description: formData.get('description'),
            url_image: uploadedImage.url,
            image_public_id: uploadedImage.publicId,
        };

        const product = new Product(dto);
        return this.repository.create(product);
    }

    async findAll() {
        return this.repository.findAll();
    }

    async editProduct(id, data) {
        return this.repository.editProduct(id, data);
    }

    async deleteProduct(id) {
        const produto = await this.repository.findById(id)

        if (!produto) {
            throw new NotFoundError(`Produto with id ${id} not found`);
        }

        await this.imagesService.delete(produto.image_public_id);

        return this.repository.delete(id);
    }

    async search(search) {
        const produtos = await this.repository.searchProduct(search);

        return produtos;
    }
}
