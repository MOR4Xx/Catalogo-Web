'use client';

import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchBar({icon, info, className}) {
    const [text, setText] = useState("");
    const router = useRouter();

    function handleSubmit(event) {
        event.preventDefault();

        if (!text.trim()) return;

        router.push(`/produtos?q=${encodeURIComponent(text)}`);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`${"flex items-center rounded-md pl-3 outline-2 -outline-offset-1 outline-transparent has-[input:focus-within]:outline-2 " +
            "has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-dark-text"} ${className}`}>
            <div className="flex items-center">
                <Image className="w-3 h-3 text-white" src={icon} alt={"Busca"}/>
            </div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={info}
                className="w-full rounded-lg px-4 py-2 text-white outline-none "
            />
        </form>
    );
}