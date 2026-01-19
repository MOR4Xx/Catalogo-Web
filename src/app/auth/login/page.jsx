"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    function handleLogin(e) {
        e.preventDefault();

        // 🔐 EXEMPLO SIMPLES (mock)
        if (email === "admin@admin.com" && senha === "123456") {
            document.cookie = "auth=true; path=/";
            router.push("/admin/produtos");
        } else {
            alert("Credenciais inválidas");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white ">
            <form
                onSubmit={handleLogin}
                className="bg-status-escuro p-6 rounded-lg shadow-md w-80"
            >
                <h1 className="text-xl font-semibold mb-4">Login</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full border p-2 mb-4"
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button className="w-full bg-primary text-white p-2 rounded">
                    Entrar
                </button>
            </form>
        </div>
    );
}
