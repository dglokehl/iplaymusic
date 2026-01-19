import "./globals.css";

import Footer from "@/components/Footer";

import { Inter, Poppins } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    preload: false
})

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
    title: {
        template: "%s | iPlayMusic",
        default: "iPlayMusic",
    },
    description: "Play your favorite music through iPlayMusic, the GOAT of music"
}


export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`pb-footer ${poppins.className}`}>
                {children}
                <Footer />
            </body>
        </html>
    );
}
