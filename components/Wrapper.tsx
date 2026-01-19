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

            <main className={`pt-header px-default pb-default ${className ? className : ""}`}>
                {children}
            </main>
        </>
    )
}