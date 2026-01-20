import "./globals.css";

import { Poppins } from "next/font/google";

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
            <body className={`${poppins.className}`}>
                {children}
            </body>
        </html>
    );
}
