import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default async function NotFound() {
    return (
        <>
            <main className="p-default pb-footer min-h-dvh flex flex-col justify-center items-center gap-10">
                <h1 className="flex justify-center gap-2">
                    <span className="heading-page text-7xl!">404</span> <span className="text-2xl font-bold">Not found</span>
                </h1>
                <p className="text-center text-lg">
                    <Link href="/" className="underline hover-75">Return to home page?</Link>
                </p>
            </main>
            <Footer />
        </>
    );
}