"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/images/LogoVelikaPreta.png";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export default function LoginPage() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { register, handleSubmit, formState } = form;
    const { errors, isSubmitting } = formState;

    async function onSubmit(values) {
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        if (res?.ok) {
            router.push("/admin/dashboard");
        }
    }

    return (
        <div className="min-h-100 flex flex-col items-center justify-center bg-white gap-4">
            <Image src={Logo} alt="Logo" width={200} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-status-escuro p-6 rounded-lg shadow-md w-80"
            >
                <h1 className="text-xl font-semibold mb-4 text-primary">Login</h1>

                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-2 rounded-lg"
                />
                {errors.email && (
                    <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Senha"
                    className="w-full border p-2 mt-2 mb-2 rounded-lg"
                />
                {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white p-2 rounded mt-4"
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}