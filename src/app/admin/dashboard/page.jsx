import { redirect } from "next/navigation";
import {getServerAuthSession} from "@/lib/auth";
import DashboardAdminClient from "@/components/layout/DashboardAdminClient";

export default async function DashboardAdmin() {
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/auth/login");
    }

    return <DashboardAdminClient />;
}
