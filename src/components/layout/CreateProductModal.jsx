"use client"

import Button from "@/components/ui/Button";

export default function CreateProductModal({onClose}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const product = {
            title: formData.get("title"),
            price: formData.get("price"),
            category: formData.get("category"),
            description: formData.get("description"),
            image: formData.get("image"), // File
        };



        console.log(product);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 backdrop-blur-sm bg-black/50" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 z-10 modal-in">
                <h2 className="text-xl font-semibold mb-3">
                    Cadastrar Produto
                </h2>

                <form onSubmit={handleSubmit}
                      encType="multipart/form-data"
                      className="flex flex-col gap-1">

                    <label>Nome</label>
                    <input
                        name="title"
                        placeholder="Nome do produto"
                        className="border rounded-xl p-2 pb-3"
                        required
                    />

                    <label>Preço</label>
                    <input
                        name="price"
                        type="number"
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
                        <Button
                            onClick={onClose}
                            className="px-4 py-2 border hover:bg-status-danger-hover bg-status-danger text-white">
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            className="px-4 py-2 bg-status-success hover:bg-status-success/80 text-white"
                        >
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}