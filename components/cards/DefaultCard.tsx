import Link from "next/link"
import Image from "next/image"

export type CardSize = "xs" | "sm" | "md" | "lg"

export type CardItem = {
    link: {
        href: string;
        external?: boolean;
    }
    heading: string;
    subheading?: string;
    size?: CardSize;
    image: {
        url: string;
        alt: string;
        width: number;
        height: number;
        className?: string;
    }
}

type DefaultCardProps = {
    item: CardItem;
}

export default function DefaultCard({ item }: DefaultCardProps) {
    let cardSize = "w-48"
    if (item.size === "xs") cardSize = "w-24"
    if (item.size === "sm") cardSize = "w-32"
    if (item.size === "lg") cardSize = "w-full sm:p-3 sm:pb-5"

    return (
        <Link href={item.link.href} target={item.link.external ? "_blank" : ""} className="rounded-lg overflow-clip">
            <article className={`p-2 pb-3 ${cardSize} h-full hover-bg *:not-first:px-0.5`}>
                <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className={`w-full aspect-square object-cover rounded ${item.image.className ? item.image.className : ""}`}
                />
                <h3 className="mt-2 text-sm font-bold line-clamp-1">
                    {item.heading}
                </h3>
                {item.subheading && (
                    <p className="text-xs font-medium text-grey-light line-clamp-1">
                        {item.subheading}
                    </p>
                )}
            </article>
        </Link>
    )
}