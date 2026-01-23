"use client";

import { useEffect, useState } from "react";
import ButtonLogout from "@/components/ui/ButtonLogout";
import CreateProductModal from "@/components/layout/CreateProductModal";
import Button from "@/components/ui/Button";

export default function DashboardAdminClient() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProdutos = async () => {
        try {
            const response = await fetch("/api/products", {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar produtos");
            }

            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error(error);
            alert("Erro ao carregar produtos" + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProdutos();
    }, []);

    const liClass =
        "text-black w-full p-4 pl-2 cursor-pointer hover:bg-status-escuro flex items-center justify-center rounded-2xl shadow-md";

    return (
        <div className="flex min-h-screen">
            {/* MENU LATERAL */}
            <aside className="w-64 p-4 flex flex-col justify-between gap-6">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    <ul className="flex flex-col w-full items-center gap-2">
                        <li className={liClass}>Produtos</li>
                        <li className={liClass}>Usuários</li>
                    </ul>
                </div>
                <ButtonLogout className="w-full bg-status-danger hover:bg-status-danger-hover text-white" />
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 p-6 bg-white shadow-md rounded-2xl">
                <div className="bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-semibold">Produtos</h2>
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
                        >
                            Novo Produto
                        </Button>
                    </div>

                    {loading ? (
                        <p className="p-4">Carregando produtos...</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Nome</th>
                                <th className="p-3">Preço</th>
                                <th className="p-3">Categoria</th>
                                <th className="p-3">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {produtos.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center">
                                        Nenhum produto cadastrado
                                    </td>
                                </tr>
                            ) : (
                                produtos.map((produto) => (
                                    <tr
                                        key={produto.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-3">{produto.name}</td>
                                        <td className="p-3">
                                            R$ {Number(produto.price).toFixed(2)}
                                        </td>
                                        <td className="p-3">{produto.category}</td>
                                        <td className="p-3 flex gap-2">
                                            <Button className="px-3 py-1 text-sm bg-status-pending/80 text-white hover:bg-status-pending">
                                                Editar
                                            </Button>
                                            <Button className="px-3 py-1 text-sm bg-status-danger text-white hover:bg-status-danger-hover">
                                                Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>

            {isCreateOpen && (
                <CreateProductModal
                    onClose={() => setIsCreateOpen(false)
                }
                    onSuccess={getProdutos}
                />
            )}
        </div>
    );
}
