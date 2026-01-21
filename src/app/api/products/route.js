import { getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

import ProductHandler from "@/backend/handlers/ProductHandler";
import Product from "@/backend/models/Produto";

export async function POST(req) {
    try {
        const session = await getServerAuthSession();
        if (!session) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const formData = await req.formData();

        const imageUrl = null;

        const dto = {
            title: formData.get("title"),
            price: Number(formData.get("price")),
            category: formData.get("category"),
            description: formData.get("description"),
            image: imageUrl
        }

        const product = new Product(dto);

        const handler = new ProductHandler();

        await handler.createProduct(product);

        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error.message ?? "Erro interno" },
            { status: 400 }
        );
    }
}
