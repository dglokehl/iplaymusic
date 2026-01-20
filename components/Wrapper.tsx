import Header from "./Header"

type WrapperProps = {
    children?: React.ReactNode;
    title?: string;
    className?: string;
}

export default function Wrapper({ children, title, className, ...rest }: WrapperProps) {
    return (
        <>
            <Header title={title ? title : ""} />

            <main className={`mb-footer pt-header px-default pb-default ${className ? className : ""}`}>
                {children}
            </main>
        </>
    )
}