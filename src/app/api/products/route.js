import { getServerAuthSession } from "@/lib/auth";
import ProductHandler from "@/backend/handlers/ProductHandler";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerAuthSession();

    if (!session) {
        return NextResponse.json(
            { error: "Não autorizado" },
            { status: 401 }
        );
    }

    const formData = await req.formData();

    const handler = new ProductHandler();

    await handler.createProduct({
        title: formData.get("title"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        description: formData.get("description"),
        image: formData.get("image"),
        userId: session.user.id,
    });

    return NextResponse.json({ success: true });
}
