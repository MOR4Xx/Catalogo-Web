import { prisma } from "@/backend/lib/prisma";

export default class ProductRepository {
    async create(product) {
        console.log("Chegou no Repository");
        return prisma.Product.create({
            data: {
                name: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
                url_image: product.image,
            },
        });
    }
}
