'use client';
import {motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams} from "next/navigation";


export default function ProductFilter({ open }) {
    const linkClass = "hover:text-dark-text cursor-pointer hover:underline"
    const router = useRouter();


    const searchParams = useSearchParams();

    function aplicarFiltro(categoria){
        const params = new URLSearchParams(searchParams.toString());

        if (categoria){
            params.set("category", categoria);
        }else {
            params.delete("category");
        }
        router.push(`/produtos?${params.toString()}`);
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full left-0 right-0 bg-primary text-white shadow-lg">
                    <div className="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-4">

                        <div>
                            <h3 className="font-semibold mb-2">Categoria</h3>
                            <ul className="space-y-2 ">
                                <li><a className={linkClass} onClick={() => aplicarFiltro("")}>Todos</a></li>
                                <li><a className={linkClass} onClick={() => aplicarFiltro("jewelery")}>Medicamentos</a></li>
                                <li><a className={linkClass} onClick={() => aplicarFiltro("men's clothing")}>Cosméticos</a></li>
                                <li><a className={linkClass} onClick={() => aplicarFiltro("electronics")}>Beleza</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Preço</h3>
                            <ul className="space-y-2">
                                <li><a className={linkClass}>Até R$50</a></li>
                                <li><a className={linkClass}>R$50 - R$100</a></li>
                                <li><a className={linkClass}>+ R$100</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Marca</h3>
                            <ul className="space-y-2">
                                <li><a className={linkClass}>Marca A</a></li>
                                <li><a className={linkClass}>Marca B</a></li>
                                <li><a className={linkClass}>Marca C</a></li>
                                <li><a className={linkClass}>Marca D</a></li>
                                <li><a className={linkClass}>Marca E</a></li>
                            </ul>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}