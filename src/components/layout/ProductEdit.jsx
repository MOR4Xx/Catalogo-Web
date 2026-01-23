"use client"

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import {useState} from "react";

export default function ProductEdit({onClose, onSuccess, data}) {
    const [id, setId] = useState(data.id);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const payload = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            category: formData.get("category"),
            description: formData.get("description"),
        };

        try {
            const res = await fetch(`/api/products/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                alert(result.error);
                return;
            }

            await onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Erro inesperado");
        }
    };

    return (
        <Modal title="Editando Produto" onClose={onClose}>
            <form onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="flex flex-col gap-1">

                <label>Nome</label>
                <input
                    name="name"
                    placeholder={data.name}
                    defaultValue={data.name}
                    className="border rounded-xl p-2 pb-3"
                    required
                />

                <label>Preço</label>
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder={data.price}
                    defaultValue={data.price}
                    className="border rounded-xl p-2 pb-3"
                    required
                />

                <label>Categoria</label>
                <input
                    name="category"
                    placeholder={data.category}
                    defaultValue={data.category}
                    className="border rounded-xl p-2 pb-3"
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    placeholder={data.description}
                    defaultValue={data.description}
                    className="border rounded-xl p-2 pb-3"
                />

                {/*<div className="flex flex-col gap-1">*/}
                {/*    <label className="text-sm">Imagem do produto</label>*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        name="image"*/}
                {/*        accept="image/*"*/}
                {/*        className="border rounded p-2"*/}
                {/*        required*/}
                {/*    />*/}
                {/*</div>*/}

                <div className="flex justify-end gap-2 pt-2">
                    <Button onClick={onClose}
                            className="px-4 py-2 border hover:bg-status-danger-hover bg-status-danger text-white">
                        Cancelar
                    </Button>
                    <Button type="submit" className="px-4 py-2 bg-status-success hover:bg-status-success/80 text-white">
                        Editar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}