import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import LoginComponent from "@/components/LoginComponent";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Life, Squared",
    description:
        "See life, piece by piece, week by week. Inspired by Tim Urban's Life Calendar.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LoginComponent />
                <main>{children}</main>
                <Toaster />
            </body>
        </html>
    );
}
