import {motion, AnimatePresence } from "framer-motion";

export default function ProductFilter({ open }) {

    const linkClass = "hover:text-dark-text cursor-pointer hover:underline"

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
                                <li><a className={linkClass}>Medicamentos</a></li>
                                <li><a className={linkClass}>Cosméticos</a></li>
                                <li><a className={linkClass}>Beleza</a></li>
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