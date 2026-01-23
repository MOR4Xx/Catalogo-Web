import {NextResponse} from "next/server";
import {getServerAuthSession} from "@/lib/auth";
import ProductHandler from "@/backend/handlers/ProductHandler";

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

async function PUT(request, {params}) {
    try {
        const session = await getServerAuthSession();
        if (!session) {
            return NextResponse.json(
                {error: "Não autorizado"},
                {status: 401}
            );
        }

        const {id} = await params;
        const formData = await request.formData;

        const dto = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            category: formData.get("category"),
            description: formData.get("description"),
            url_image: "",
        }

        const handler = new ProductHandler();

        return handler.editProduct(Number(id), dto);

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Erro ao Editar produto"},
            {status: 500});
    }
}

