import CardProduto from "@/components/ui/CardProduto";
import {ProdutoType} from "@/types/Produto";


async function getProdutos() {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
        throw new Error( "Erro to fetch produtos" );
    }

    return res.json();
}

export default async function Home(){
    const produtos = await getProdutos();

    return (
        <div className={"max-w-7xl mx-auto flex flex-col bg-white pt-6 px-8 gap-6"}>
            <h1>{"Home > Produtos"}</h1>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
                {produtos.map((produto) => (
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