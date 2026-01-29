import Link from "next/link"
import CoverImage from "../CoverImage"
import type { DefaultImageProps } from "../CoverImage"

export type CardSize = "xs" | "sm" | "lg"

type BaseCardProps = {
    card: {
        href: string;
        cover: {
            images: DefaultImageProps;
            alt: string;
            className?: string;
        }
        heading: string;
        subheading?: string | React.ReactNode;
    }
    size?: CardSize;
    className?: string;
}

export default function BaseCard({ card, size, className }: BaseCardProps) {
    let cardSize = "w-48"
    if (size === "xs") cardSize = "w-24"
    if (size === "sm") cardSize = "w-32"
    if (size === "lg") cardSize = "w-full sm:p-3 sm:pb-5"

    return (
        <article className={`relative rounded-lg overflow-clip hover-bg ${className ? className : ""}`}>
            <Link href={card.href} className="size-full absolute inset-0 z-1"></Link>

            <div className={`relative z-2 pointer-events-none p-2 pb-3 ${cardSize} h-full *:not-first:px-0.5`}>
                <CoverImage
                    images={card.cover.images}
                    alt={card.cover.alt}
                    className={`w-full aspect-square rounded ${card.cover.className ? card.cover.className : ""}`}
                />
                <h3 className="mt-2 text-sm font-bold line-clamp-1">
                    {card.heading}
                </h3>
                {card.subheading && (
                    <p className="text-xs font-medium text-grey-light line-clamp-1">
                       {card.subheading}
                    </p>
                )}
            </div>
        </article>
    )
}