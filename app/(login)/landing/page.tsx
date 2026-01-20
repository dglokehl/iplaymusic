import Image from "next/image"
import SplashLogo from "@/components/SplashLogo"
import LandingGallery from "../_components/LandingGallery"

export default async function LandingPage() {
    return (
        <main className="px-default py-10 min-h-dvh flex flex-col justify-end items-center gap-8 relative z-0 bg-ipm-gradient">
            <SplashLogo />
            <Image
                src="/ipm-blob.png"
                alt="Background element"
                width={477}
                height={428}
                quality={100}
                className="block max-w-4/3 max-xs:w-4/3 fixed -top-32 xs:-top-48 -z-1"
            />

            <LandingGallery />
        </main>
    )
}