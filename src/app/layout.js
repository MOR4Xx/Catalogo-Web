import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Catalogo Web",
    description: "Amostra Catalogo WEB empresarial",
};

export default function RootLayout({children}) {
    return (
        <html lang="pt-br">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Header/>
        <main className="pt-26">{children}</main>
        </body>
        </html>
    );
}
