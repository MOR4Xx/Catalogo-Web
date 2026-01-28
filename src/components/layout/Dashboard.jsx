"use client";

import { useState } from "react";
import ButtonLogout from "@/components/ui/ButtonLogout";
import ProductDashboard from "./ProductDashboard.jsx";
import UsuarioDashboard from "./UsuarioDashboard.jsx";

export default function Dashboard() {
    const [view, setView] = useState("produtos");

    const liClass = "text-black w-full p-4 pl-2 cursor-pointer hover:bg-status-escuro flex items-center justify-center rounded-2xl shadow-md";

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 p-4 flex flex-col justify-between gap-6">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    <ul className="flex flex-col w-full items-center gap-2">

                        <li className={liClass}
                            onClick={() => setView("produtos")}>
                            Produtos
                        </li>

                        <li className={liClass}
                            onClick={() => setView("usuarios")}>
                            Usuários
                        </li>

                        <li className="w-full shadow-md">
                            <ButtonLogout className="w-full bg-status-danger hover:bg-status-danger-hover text-white" />
                        </li>
                    </ul>
                </div>
            </aside>

            <main className="flex-1 p-6 bg-white shadow-lg rounded-2xl">
                {view === "produtos" && <ProductDashboard />}
                {view === "usuarios" && <UsuarioDashboard />}
            </main>
        </div>
    );
}
