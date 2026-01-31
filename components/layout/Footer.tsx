"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdHome, MdRssFeed, MdLibraryMusic } from "react-icons/md";
import { BsMusicPlayerFill, BsPersonCircle } from "react-icons/bs";
import FooterMusicPlayer from "../wrappers/FooterMusicPlayer";

const footerItems = [
    {
        href: "/",
        body: <MdHome />
    },
    {
        href: "/browse",
        body: <MdRssFeed />
    },
    {
        href: "",
        body: <BsMusicPlayerFill />
    },
    {
        href: "/music",
        body: <MdLibraryMusic />
    },
    {
        href: "/profile",
        body: <BsPersonCircle />
    },
]

export default function Footer() {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")

    const [playerOpen, setPlayerOpen] = useState(false);

    return (
        <>
            <FooterMusicPlayer open={playerOpen} />

            <footer className="px-default h-footer flex items-center fixed bottom-0 inset-x-0 z-999 bg-ipm-black">
                <nav className="wrapper-default size-full flex justify-around items-center gap-5 *:*:size-6 *:cursor-pointer *:select-none *:hover-brightness">
                    {footerItems.map((item, i) => item.href ? (
                            <Link href={item.href} key={i} className={`/${pathnameArr[1]}` !== item.href ? "*:fill-[url(#ipm-gradient)]" : ""}>
                                {item.body}
                            </Link>
                        ) : (
                            <figure className={`p-2 rounded-full bg-ipm-gradient ${!playerOpen ? "*:text-ipm-black" : "*:text-white"}`} onClick={() => setPlayerOpen(!playerOpen)} key={i}>
                                {item.body}
                            </figure>
                        )
                    )}
                </nav>
                <svg width="0" height="0">
                    <linearGradient id="ipm-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#FF6A00" offset="0%" />
                        <stop stopColor="#EE0979" offset="100%" />
                    </linearGradient >
                </svg>
            </footer>
        </>
    )
}