'use client';

import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import CardProduct from "@/components/ui/CardProduct";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();

    const query = searchParams.get("q") || "";
    const categoria = searchParams.get("category") || "";

    useEffect(() => {
        async function getProdutos() {
            try {
                setLoading(true);

                const params = new URLSearchParams();

                if (query) params.append("search", query);
                if (categoria) params.append("category", categoria);

                const response = await fetch(
                    `/api/products?${params.toString()}`
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }

                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        getProdutos();
    }, [query, categoria]);

    const router = useRouter();

    function limparPesquisa() {
        router.push("/produtos");
    }

    return (
        <div className="max-w-7xl min-h-screen mx-auto flex flex-col bg-white pt-6 pb-2 px-8 gap-6 mb-6">
            <h1 className="text-lg font-semibold">
                {query && (
                    <span className="flex flex-row gap-2 ml-2 text-sm text-gray-600">
                        | Busca por: <strong>{query}</strong>
                        <p className={"underline cursor-pointer"} onClick={limparPesquisa}>Limpar Pesquisa</p>
                    </span>
                )}
                {categoria && (
                    <span className="flex flex-row gap-2 ml-2 text-sm text-gray-600">
                        | Categoria: <strong>{categoria}</strong>
                        <p className={"underline cursor-pointer"} onClick={limparPesquisa}>Limpar Pesquisa</p>
                    </span>
                )}
            </h1>

            {loading && (
                <p className="text-gray-500 text-sm">Carregando produtos...</p>
            )}

            {!loading && produtos.length === 0 && (
                <p className="text-gray-500 text-sm">
                    Nenhum produto encontrado.
                </p>
            )}

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {produtos.map((produto) => (
                    <CardProduct
                        key={produto.id}
                        produto={{
                            id: String(produto.id),
                            title: produto.name,
                            price: produto.price,
                            image: produto.url_image,
                            category: produto.category,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
