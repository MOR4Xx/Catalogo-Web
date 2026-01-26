"use client";

import {useEffect, useState} from "react";
import CreateProductModal from "@/components/layout/ProductCreate";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ProductDelete from "./ProductDelete.jsx";
import ProductEdit from "./ProductEdit.jsx";
import Image from "next/image";
import imageTeste from "@/public/images/LogoVelikaPreta.png";
import SearchIcon from "@/public/icons/searchBlack.svg";


export default function ProductDashboard() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [showNotificacao, setShowNotificacao] = useState(false);

    const [produtos, setProdutos] = useState([]);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productEdit, setProductEdit] = useState(null);

    const [text, setText] = useState("");

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
                {method: "DELETE"}
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

    async function handleSubmit(event) {
        event.preventDefault();

        if (!text.trim()) {
            getProdutos();
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `/api/products?search=${encodeURIComponent(text)}`
            );

            if (!response.ok) {
                throw new Error("Erro na busca");
            }

            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error(error);
            alert("Erro ao buscar produtos");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getProdutos();
    }, []);


    return (
        <>
            <div className="flex-1 p-6 h-ful gap-2">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center p-4">
                        <h2 className="text-xl font-semibold">Produtos</h2>

                        <form
                            onSubmit={handleSubmit}
                            className={"flex items-center rounded-md pl-3 outline-2 -outline-offset-1 outline-transparent has-[input:focus-within]:outline-2 bg-status-escuro " +
                            "has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-black"}>
                            <div className="flex items-center">
                                <Image className="w-3 h-3 text-black" src={SearchIcon} alt={"Busca"}/>
                            </div>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder={"Buscar produtos..."}
                                className="w-full rounded-lg px-4 py-2 text-gray-500 outline-none "
                            />
                        </form>

                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
                        >
                            Novo Produto
                        </Button>
                    </div>

                    {loading ? (
                        <p className="p-4">Carregando produtos...</p>
                    ) : produtos.length === 0 ? (
                        <div className="flex items-center justify-center p-4 rounded-lg">
                            <p className="text-xl font-semibold">
                                Nenhum produto cadastrado
                            </p>
                        </div>
                    ) : (
                        produtos.map((produto) => (
                            <div
                                key={produto.id}
                                className="flex items-center gap-4 p-4 shadow-sm bg-status-escuro rounded-lg hover:bg-status-escuro/60">
                                <Image src={imageTeste} alt={produto.name} width={100} height={100}/>

                                <div className="flex flex-col gap-2 justify-center items-start flex-1">
                                    <p className="font-semibold">Nome: {produto.name}</p>
                                    <p>Preço: R${Number(produto.price).toFixed(2)}</p>
                                    <p>Categoria: {produto.category}</p>
                                    <p className="text-sm text-gray-500 text-center">
                                        {produto.description}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 ">
                                    <Button
                                        className="px-3 py-1 text-sm bg-status-pending/80 text-white hover:bg-status-pending"
                                        onClick={() => {
                                            setProductEdit(produto);
                                            setIsEditOpen(true)
                                        }}>
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
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

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
                    onConfirmed={() => {
                        deleteProduct();
                        getProdutos();
                    }}
                />
            )}

            {isEditOpen && (
                <ProductEdit onClose={() => setIsEditOpen(false)}
                             onSuccess={() => getProdutos()}
                             data={productEdit}
                />
            )}

            {showNotificacao && (
                <Modal title="Produto Cadastrado" onClose={() => setShowNotificacao(false)}
                       className={"flex flex-col justify-end"}>
                    <Button className="bg-status-success text-white" onClick={() => setShowNotificacao(false)}>
                        Continuar
                    </Button>
                </Modal>
            )}
        </>
    );
}
