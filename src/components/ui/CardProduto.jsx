import Button from "@/components/ui/Button";
import ImageLoading from "@/components/layout/ImageLoading";

/**
 * @param {{ produto: Produto }} props
 */

export default function CardProduto({ produto }) {
    return (
        <div className="flex flex-col bg-status-escuro border border-black/20 hover:border-black p-4 gap-4 rounded-lg shadow-md h-full">

            <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                <ImageLoading fill product={produto} />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <h2 className="text-black font-semibold line-clamp-2 flex-1">
                    {produto.title}
                </h2>
                <span className="text-sm text-black/80">{produto.category}</span>
                <span className="text-black font-bold mt-auto">
          R$ {produto.price.toFixed(2)}
        </span>
            </div>

            <Button className="bg-status-success hover:bg-status-success/80 text-white w-full">
                Adicionar ao Carrinho
            </Button>
        </div>
    );
}
