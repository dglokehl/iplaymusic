type MainProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Main({ children, className }: MainProps) {
    return (
        <main className={`wrapper-default mb-footer p-default pt-header space-y-6 ${className ? className : ""}`}>
            {children}
        </main>
    )
}