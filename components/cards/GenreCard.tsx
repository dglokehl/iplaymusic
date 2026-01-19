import Link from "next/link"

type GenreCardProps = {
    body: string;
    className?: string;
}

export default function GenreCard({ body, className }: GenreCardProps) {
    return (
        <Link href={`/search/${body}`} className={`py-2 px-3 inline-block text-xs font-bold bg-ipm-magenta-light rounded-full hover-75 ${className ? className : ""}`}>
            #{body}
        </Link>
    )
}