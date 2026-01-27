import { getServerAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

import ProductHandler from "@/backend/services/ProductService";

/**
 * CRIAR PRODUTO
 */
export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("image");

        if (!file) {
            return NextResponse.json(
                { error: "Imagem não enviada" },
                { status: 400 }
            );
        }

        const handler = new ProductHandler();
        const product = await handler.createProduct(formData);

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
