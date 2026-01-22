type WrapperProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Wrapper({ children, className, ...rest }: WrapperProps) {
    return (
        <main className={`wrapper-default mb-footer pt-header px-default pb-default ${className ? className : ""}`}>
            {children}
        </main>
    )
}