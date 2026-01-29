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
                image_public_id: product.image_public_id,
            },
        });
    }

    async findAll() {
        return prisma.Product.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    }

    async editProduct(id, data) {
        await prisma.Product.update({
            where: {id: id},
            data: {
                name: data.name,
                price: data.price,
                category: data.category,
                description: data.description,
                url_image: data.url_image,
                image_public_id: data.image_public_id,
            }
        });
    }

    async delete(id) {
        await prisma.product.delete({
            where: { id },
        });
    }

    async searchProduct(search) {
        return prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        category: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            orderBy: {
                name: 'asc',
            },
        });
    }

    async findById(id) {
        return prisma.product.findUnique({
            where: {
                id: id,
            }
        })
    }

}