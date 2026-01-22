import {prisma} from "@/lib/prisma";

export default class ProductRepository {
    async create(product) {
        prisma.create(product);
        console.log("Product created");
    }
}
