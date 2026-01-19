export const dynamic = "force-dynamic";

import CardProduto from "@/components/ui/CardProduto";

async function getProdutos() {
    const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Erro na busca dos produtos");
    }

    return res.json();
}

export default async function Produtos({searchParams}) {
    const produtos = await getProdutos();

    const params = await searchParams;

    const query = params?.q?.toLowerCase() || "";
    const categoria = params?.category || "";

    const produtosFiltrados = produtos.filter((produto) => {
        const matchQuery = query
            ? produto.title.toLowerCase().includes(query)
            : true;

        const matchCategory = categoria
            ? produto.category === categoria
            : true;

        return matchQuery && matchCategory;
    });

    return (
        <div className={"max-w-7xl min-h-screen mx-auto flex flex-col bg-white pt-6 pb-2 px-8 gap-6 mb-6"}>
            <h1>{query && (
                <span className="ml-2">
                        | Busca por: <strong>{params.q}</strong>
                    </span>
            )}</h1>

            {produtosFiltrados.length === 0 && (
                <p className="text-gray-500 text-sm">
                    Nenhum produto encontrado.
                </p>
            )}

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
                {produtosFiltrados.map((produto) => (
                    <CardProduto
                        key={produto.id}
                        produto={{
                            id: String(produto.id),
                            title: produto.title,
                            price: produto.price,
                            image: produto.image,
                            category: produto.category,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}