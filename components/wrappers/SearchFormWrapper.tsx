"use client"

type SearchFormWrapperProps = {
    children: React.ReactNode;
    className?: string;
}

export default function SearchFormWrapper({ children, className }: SearchFormWrapperProps) {
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        const query = e.currentTarget.q.value.trim()
        if (!query) e.preventDefault()
    }

    return (
        <form
            action="/search"
            noValidate
            onSubmit={submitForm}
            className={className ? className : ""}
        >
            {children}
        </form>
    )
}