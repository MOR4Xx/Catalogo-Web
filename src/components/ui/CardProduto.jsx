import Image from "next/image";
import Button from "@/components/ui/Button";

/**
 * @param {{ produto: Produto }} props
 */
export default function CardProduto({ produto }) {
    return (
        <div className="flex flex-col bg-primary p-4 gap-4 rounded-lg shadow-md h-full">

            <div className="relative w-full h-[250px] bg-white rounded-lg overflow-hidden">
                <Image
                    src={produto.image}
                    alt={produto.title}
                    fill
                    className="rounded-lg w-full h-[250px] bg-white"
                />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <h2 className="text-white font-semibold line-clamp-2">
                    {produto.title}
                </h2>

                <span className="text-sm text-white/80">
          {produto.category}
        </span>

                <span className="text-white font-bold mt-auto">
          R$ {produto.price.toFixed(2)}
        </span>
            </div>

            <Button classNames="bg-status-success hover:bg-status-success/80 text-white w-full">
                Adicionar ao Carrinho
            </Button>
        </div>
    );
}
