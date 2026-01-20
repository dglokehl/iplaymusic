"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

type SplashLogoProps = {
    children?: React.ReactNode;
    className?: string;
}

export default function SplashLogo({ children, className, ...rest }: SplashLogoProps) {
    const [visible, setVisible] = useState(true);
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 2000);
        setTimeout(() => {
            setHidden(true)
        }, 2500);
    }, []);
    return (
        <div className={`size-full flex flex-col justify-center items-center gap-9 fixed inset-0 z-9999999 bg-bg duration-450 select-none ${visible ? "opacity-100" : "opacity-0 animate-ping"} ${hidden ? "hidden" : ""}`} {...rest}>
            <Image
                src="/ipm-logo.png"
                alt="iPlayMusic logo"
                width={200}
                height={209}
            />
            <p className="text-3xl font-bold">iPlayMusic</p>
        </div>
    )
}