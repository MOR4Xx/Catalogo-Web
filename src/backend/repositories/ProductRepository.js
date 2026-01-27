import {prisma} from "@/lib/prisma";
import {cloudinary} from "@/lib/cloudinary"

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

}