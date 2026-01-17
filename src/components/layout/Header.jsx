"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import SearchBar from "@/components/ui/SearchBar";
import ProductFilter from "@/components/layout/ProductFilter";

import logo from "@/public/images/LogoVelikaVerticalMenor.png";
import iconBusca from "@/public/icons/search.svg";
import iconCarrinho from "@/public/icons/carrinho.svg";

export default function Header() {
    const pathname = usePathname();
    const [openFilter, setOpenFilter] = useState(false);


    const navLinkClasses = (active) =>
        `relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
            active ? "text-dark-text" : "text-white hover:text-dark-text"
        }`;

    useEffect(() => {
        setOpenFilter(false);
    }, [pathname]);

    // Componente
    return (
        <header className="fixed top-0 w-full left-0 right-0 z-50 bg-primary flex flex-col shadow-sm">

            <div className="max-w-7xl mx-auto flex items-center justify-between p-4 text-white container px-6">
                {/* Logo */}
                <Link href={"/"}>
                    <Image className=" h-auto w-40 justify-center" src={logo} alt={"logo"} />
                </Link>

                {/* Barra de Pesquisa */}

                <div className="flex-1 mx-10 max-w-md">
                    <SearchBar icon={iconBusca} info={"Buscar produtos..."}/>
                </div>

                {/* Menu */}
                <nav>
                    <ul className="flex items-center gap-7 p-px-5">

                        {/* Dropdown */}
                        <li className="flex flex-row items-center">
                            <Link href={"/produtos"}
                                className="relative flex items-center py-2 text-sm font-medium transition-colors hover:text-dark-text">
                                Produtos
                            </Link>
                            <svg
                                onClick={() => setOpenFilter(prev => !prev)}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={`size-5 transition-transform ${
                                    openFilter ? "rotate-180" : ""}`}>
                                <path
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </li>
                        <li>
                            <Link href={"/contato"} className={navLinkClasses(pathname === "/contato")}>
                                <>
                                    Contato
                                </>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/carrinho"} className={navLinkClasses(pathname === "/carrinho")}>
                                <div className="flex flex-row justify-center items-center">
                                    Carrinho
                                    <Image src={iconCarrinho} alt={"carrinho"} className="w-5 h-5"/>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <ProductFilter open={openFilter}/>
        </header>
    );
}