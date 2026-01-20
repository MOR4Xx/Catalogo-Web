import {getServerAuthSession} from "@/lib/auth"
import {redirect} from "next/navigation";
import ButtonLogout from "@/components/ui/ButtonLogout";

export default async function DashboardAdmin() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/auth/login");
    }

    const liClass = "text-black w-full p-4 pl-2 border-b-1 cursor-pointer";

    return (
        <div className="flex flex-row gap-1 min-h-screen">
            <div className="flex flex-col gap-2 p-4 border-r-1">
                <div className="flex flex-col gap-2 border-b-1 p-4 items-center">
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                    <ButtonLogout className="w-30 bg-status-danger hover:bg-status-danger-hover text-white"/>
                </div>
                <div className="p-4">
                    <ul>
                        <li className={liClass}>Cadastra Produto</li>
                        <li className={liClass}>Editar Produto</li>
                        <li className={liClass}>Excluir Produto</li>
                        <li className={liClass}>Produtos Cadastrados</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

