import {prisma} from "@/lib/prisma";

export default class ProductRepository {
    async create(product) {
        return prisma.Product.create({
            data: {
                name: product.name,
                price: product.price,
                category: product.category,
                description: product.description,
                url_image: product.url_image,
            },
        });
    }

    async findAll() {
        return prisma.Product.findMany({
            orderBy: {
                id: "desc",
            },
        });
    }
}