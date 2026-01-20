"use client";

import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

export default function ButtonLogout( {className}) {
    return (
        <Button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className={className}
        >
            Sign Out
        </Button>
    );
}
