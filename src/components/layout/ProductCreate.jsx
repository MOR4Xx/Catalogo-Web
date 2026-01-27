"use client"

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function ProductCreate({onClose, onSuccess}) {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            await onSuccess();

            onClose();

        } catch (error) {
            alert("Erro inesperado");
            console.error(error);
        }
    };

    return (
        <Modal title="Cadastrando Produto" onClose={onClose}>
            <form onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="flex flex-col gap-1">

                <label>Nome</label>
                <input
                    name="name"
                    placeholder="Nome do produto"
                    className="border rounded-xl p-2 pb-3"
                    required
                />

                <label>Preço</label>
                <input
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="Preço"
                    className="border rounded-xl p-2 pb-3"
                    required
                />

                <label>Categoria</label>
                <input
                    name="category"
                    placeholder="Categoria"
                    className="border rounded-xl p-2 pb-3"
                    required
                />

                <label>Description</label>
                <textarea
                    name="description"
                    placeholder="Descrição"
                    className="border rounded-xl p-2 pb-3"
                />

                <div className="flex flex-col gap-1">
                    <label className="text-sm">Imagem do produto</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="border rounded p-2"
                        required
                    />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <Button onClick={onClose} className="px-4 py-2 border hover:bg-status-danger-hover bg-status-danger text-white">
                        Cancelar
                    </Button>

                    <Button type="submit" className="px-4 py-2 bg-status-success hover:bg-status-success/80 text-white">
                        Cadastrar
                    </Button>
                </div>
            </form>
        </Modal>
    );
}