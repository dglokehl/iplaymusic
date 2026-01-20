import Footer from "@/components/Footer";

export default async function PagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}