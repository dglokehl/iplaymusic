import Link from "next/link"

type GenreCardProps = {
    body: string;
    className?: string;
}

export default function GenreCard({ body, className }: GenreCardProps) {
    if (!body) return
    return (
        <Link
            href={`/search?q=${body}`}
            className={`py-2 px-3 inline-block text-xs font-bold whitespace-nowrap bg-ipm-magenta-light rounded-full hover-75 ${className ? className : ""}`}
        >
            #{body}
        </Link>
    )
}