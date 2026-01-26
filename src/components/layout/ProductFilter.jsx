'use client';

import {motion, AnimatePresence} from "framer-motion";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useRef} from "react";

export default function ProductFilter({open, onClose}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ref = useRef(null);

    const linkClass =
        "cursor-pointer hover:underline hover:text-gray-200";

    function updateQueryParam(key, value) {
        const params = new URLSearchParams(searchParams.toString());

        if (!value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        router.push(`/produtos?${params.toString()}`);
        onClose();
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.25}}
                    className="absolute top-full left-0 right-0 bg-primary text-white shadow-lg z-50"
                >
                    <div
                        ref={ref}
                        className="max-w-7xl mx-auto p-6 grid grid-cols-4 gap-6"
                    >

                        {/* CATEGORIA */}
                        <div>
                            <h3 className="font-semibold mb-2">Categoria</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("category", null)}
                                    >
                                        Todos
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("category", "Medicamentos")}
                                    >
                                        Medicamentos
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("category", "Higiene")}
                                    >
                                        Higiene
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("category", "Antibiótico")}
                                    >
                                        Antibióticos
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* PREÇO (exemplo preparado) */}
                        <div>
                            <h3 className="font-semibold mb-2">Preço</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("price", "0-50")}
                                    >
                                        Até R$50
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("price", "50-100")}
                                    >
                                        R$50 - R$100
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("price", "100+")}
                                    >
                                        + R$100
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Marca</h3>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("brand", "Marca A")}
                                    >
                                        Marca A
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className={linkClass}
                                        onClick={() => updateQueryParam("brand", "Marca B")}
                                    >
                                        Marca B
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* LIMPAR */}
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    router.push("/produtos");
                                    onClose();
                                }}
                                className="text-red-300 hover:underline text-sm"
                            >
                                Limpar filtros
                            </button>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
