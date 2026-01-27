import {NextResponse} from "next/server";
import {getServerAuthSession} from "@/lib/auth";
import ProductHandler from "@/backend/services/ProductService";

export async function DELETE(request, {params}) {
    try {
        const session = await getServerAuthSession();
        if (!session) {
            return NextResponse.json(
                {error: "Não autorizado"},
                {status: 401}
            );
        }

        const {id} = await params;

        const handler = new ProductHandler();
        await handler.deleteProduct(Number(id));

        return NextResponse.json({success: true});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: "Erro ao excluir produto"},
            {status: 500}
        );
    }
}

export async function PUT(request, {params}) {
    try {
        const session = await getServerAuthSession();
        if (!session) {
            return NextResponse.json(
                {error: "Não autorizado"},
                {status: 401}
            );
        }

        const {id} = await params;
        const formData = await request.json();

        const dto = {
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            description: formData.description,
            url_image: "",
        }

        const handler = new ProductHandler();

        handler.editProduct(Number(id), dto);

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Erro ao Editar produto"},
            {status: 500});
    }
}

