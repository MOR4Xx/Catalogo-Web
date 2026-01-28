import { getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

import ProductHandler from "@/backend/services/ProductService";

/**
 * CRIAR PRODUTO
 */
export async function POST(req) {
    try {
        const formData = await req.formData();

        const handler = new ProductHandler();
        const product = await handler.createProduct(formData);

        if (!product) {
            return NextResponse.json(
                { error: "Produto não foi criado" },
                { status: 500 }
            );
        }

        return NextResponse.json(product, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro ao criar produto" },
            { status: 500 }
        );
    }
}

/**
 * LISTAR PRODUTOS
 */
export async function GET(request) {
    try {
        const session = await getServerAuthSession();
        if (!session) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search");

        const handler = new ProductHandler();

        const produtos = search
            ? await handler.search(search)
            : await handler.findAll();

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
