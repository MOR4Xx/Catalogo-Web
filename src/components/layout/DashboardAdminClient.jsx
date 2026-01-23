"use client";

import {useEffect, useState} from "react";
import ButtonLogout from "@/components/ui/ButtonLogout";
import CreateProductModal from "@/components/layout/ProductCreate";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ProductDelete from "./ProductDelete.jsx";
import ProductEdit from "./ProductEdit.jsx";

export default function DashboardAdminClient() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showNotificacao, setShowNotificacao] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productEdit, setProductEdit] = useState(null);

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

    const deleteProduct = async () => {
        try {
            const response = await fetch(
                `/api/products/${productToDelete}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Erro ao excluir produto");
            }

            await getProdutos();
            setIsDeleteOpen(false);
            setProductToDelete(null);
        } catch (error) {
            console.error(error);
            alert("Erro ao excluir produto");
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
                        <li className={"w-full"}><ButtonLogout
                            className="w-full bg-status-danger hover:bg-status-danger-hover text-white"/></li>
                    </ul>
                </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 p-6 bg-white shadow-2xl rounded-2xl">
                <div className="">
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
                                <th className="p-3">ID</th>
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
                                        <td className="p-3">{produto.id}</td>
                                        <td className="p-3">{produto.name}</td>
                                        <td className="p-3">
                                            R$ {Number(produto.price).toFixed(2)}
                                        </td>
                                        <td className="p-3">{produto.category}</td>
                                        <td className="p-3 flex gap-2">
                                            <Button
                                                className="px-3 py-1 text-sm bg-status-pending/80 text-white hover:bg-status-pending"
                                                onClick={() => {
                                                    setProductEdit(produto);
                                                    setIsEditOpen(true)
                                                }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                className="px-3 py-1 text-sm bg-status-danger text-white hover:bg-status-danger-hover"
                                                onClick={() => {
                                                    setProductToDelete(produto.id);
                                                    setIsDeleteOpen(true);
                                                }}>
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
                    onClose={() => setIsCreateOpen(false)}
                    onSuccess={async () => {
                        await getProdutos();
                        setShowNotificacao(true);
                    }}
                />
            )}

            {isDeleteOpen && (
                <ProductDelete
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirmed={()=>{
                        deleteProduct();
                        getProdutos();
                    }}
                />
            )}

            {isEditOpen && (
                <ProductEdit onClose={() => setIsEditOpen(false)}
                onSuccess={() => {
                    getProdutos();
                }}
                data={productEdit}
                />
            )}

            {showNotificacao && (
                <Modal title="Produto Cadastrado" onClose={() => setShowNotificacao(false)} className={"flex flex-col justify-end"}>
                    <Button className="bg-status-success text-white" onClick={() => setShowNotificacao(false)}>
                        Continuar
                    </Button>
                </Modal>
            )}
        </div>
    );
}
