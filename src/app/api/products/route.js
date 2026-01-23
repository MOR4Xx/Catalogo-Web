import { getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

import ProductHandler from "@/backend/handlers/ProductHandler";
import Product from "@/backend/models/Produto";

/**
 * CRIAR PRODUTO
 */
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

        const dto = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            category: formData.get("category"),
            description: formData.get("description"),
            url_image: "aa",
        };

        const product = new Product(dto);
        const handler = new ProductHandler();

        await handler.createProduct(product);

        return NextResponse.json(
            { success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: error.message ?? "Erro interno" },
            { status: 400 }
        );
    }
}

/**
 * LISTAR PRODUTOS
 */
export async function GET() {
    try {
        const handler = new ProductHandler();

        const produtos = await handler.findAll();

        return NextResponse.json(produtos, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Erro ao buscar produtos" },
            { status: 500 }
        );
    }
}

export async function DELETE(request, {params}) {
    try {
        const session = await getServerAuthSession(request);
        if (!session) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            )
        }

        const handler = new ProductHandler();
        await handler.delete(params);

        return NextResponse.json({ success: true });

    }catch(error) {
        console.log(error);
    }
}
