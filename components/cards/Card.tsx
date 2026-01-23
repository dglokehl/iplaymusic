import Link from "next/link"
import CoverImage from "../CoverImage"
import MapArtistLinks from "../map/MapArtistLinks";
import { formatReleaseDate } from "@/utils/helpers";

export type CardSize = "xs" | "sm" | "lg"

export type CardItem = {
    href: string;
    heading: string;
    subheading: string | React.ReactNode;
    size?: CardSize;
    images: {
        url: string;
        alt: string;
        width: number;
        height: number;
    }[]
    artists: any[]
    owner: {
        id: string;
        display_name: string;
    }

    id: string;
    name: string;
    release_date: string;
    album_type: string;
}

type CardProps = {
    item: CardItem;
    type: "album" | "artistAlbum" | "playlist" | "artist";
    size?: CardSize;
}

export default function Card({ item, type, size }: CardProps) {
    let obj
    if (type === "album") obj = {
        href: `/music/albums/${item.id}`,
        heading: item.name,
        subheading: <MapArtistLinks artists={item.artists} className="pointer-events-auto" />,
        size: "sm",
        cover: {
            images: item.images,
            alt: `${item.name} cover`,
        }
    }
    if (type === "artistAlbum") obj = {
        href: `/music/albums/${item.id}`,
        heading: item.name,
        subheading: <>{formatReleaseDate(item.release_date, "year")} · <span className="capitalize">{item.album_type}</span></>,
        size: "sm",
        cover: {
            images: item.images,
            alt: `${item.name} cover`,
        }
    }
    if (type === "playlist") obj = {
        href: `/music/playlists/${item.id}`,
        heading: item.name,
        subheading: <Link href={`/users/${item.owner.id}`} className="hover-75 pointer-events-auto">{item.owner.display_name}</Link>,
        size: "sm",
        cover: {
            images: item.images,
            alt: `${item.name} cover`,
        }
    }
    if (type === "artist") obj = {
        href: `/music/artists/${item.id}`,
        heading: item.name,
        size: "sm",
        cover: {
            images: item.images,
            alt: `${item.name} cover`,
        }
    }
    if (!obj) return

    let cardSize = "w-48"
    if (size === "xs") cardSize = "w-24"
    if (size === "sm") cardSize = "w-32"
    if (size === "lg") cardSize = "w-full sm:p-3 sm:pb-5"

    return (
        <article className="relative rounded-lg overflow-clip hover-bg">
            <Link href={obj.href} className="size-full absolute inset-0 z-1"></Link>
            <div className={`relative z-2 pointer-events-none p-2 pb-3 ${cardSize} h-full *:not-first:px-0.5`}>
                <CoverImage
                    images={obj.cover.images}
                    alt={obj.cover.alt}
                    className={`w-full aspect-square ${type === "artist" ? "rounded-full" : "rounded"}`}
                />
                <h3 className="mt-2 text-sm font-bold line-clamp-1">
                    {obj.heading}
                </h3>
                {obj.subheading && (
                    <p className="text-xs font-medium text-grey-light line-clamp-1">
                       {obj.subheading}
                    </p>
                )}
            </div>
        </article>
    )
}