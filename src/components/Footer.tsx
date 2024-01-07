import React from "react";
import Link from "next/link";
import { Github } from "lucide-react";

const Footer = () => {
    return (
        <div className="flex w-full flex-row justify-between wrapper pt-16 pb-8 text-lg">
            <Link
                href="https://github.com/KevinWu098/lifesquared"
                target="_blank"
                referrerPolicy="no-referrer"
            >
                <Github className="w-8 h-8" />
            </Link>

            <div className="text-neutral-600 italic">
                <span>Inspired by </span>
                <Link
                    href="https://store.waitbutwhy.com/products/life-calendar"
                    target="_blank"
                    referrerPolicy="no-referrer"
                >
                    <span className="underline">Tim Urban's Life Calendar</span>
                </Link>
                <span className="not-italic"> 💖</span>
            </div>
        </div>
    );
};

export default Footer;
