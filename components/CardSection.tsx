import Link from "next/link"
import type { CardSize } from "./cards/Card";
import TrackList from "./TrackList";
import Card from "./cards/Card";

export type DefaultItemObject = {
    items: any[]
    total: number;
}

type CardSectionProps = {
    heading: {
        body: string;
        button?: {
            body: string;
            href: string;
        };
    }
    obj: DefaultItemObject;
    type: "albums" | "userAlbums" | "artistAlbums" | "playlists" | "artists" | "tracks" ;
    cardSize?: CardSize;
    className?: string;
}

export default function CardSection({ heading, obj, type, cardSize, className }: CardSectionProps) {
    return (
        <section className={`space-y-1 ${className ? className : ""}`}>
            <div className="flex justify-between items-end">
                <h2 className="text-lg font-bold">{heading.body}</h2>
                {heading.button && heading.button.href ? (
                    <Link href={heading.button.href} className="text-sm font-light text-ipm-magenta-light hover-75">
                        {heading.button.body}
                    </Link>
                ) : heading.button && (
                    <span className="text-sm font-light text-ipm-magenta-light hover-75">{heading.button.body}</span>
                )}
            </div>

            {type === "tracks" ? <TrackList tracks={obj.items} /> : (
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {type === "albums" && obj.items.map((item: any, i: number) => <Card item={item} type="album" {...(cardSize && ({ size: cardSize }))} key={i} />)}
                    {type === "userAlbums" && obj.items.map((item: any, i: number) => <Card item={item.album} type="album" {...(cardSize && ({ size: cardSize }))} key={i} />)}
                    {type === "artistAlbums" && obj.items.map((item: any, i: number) => <Card item={item} type="artistAlbum" {...(cardSize && ({ size: cardSize }))} key={i} />)}
                    {type === "playlists" && obj.items.map((item: any, i: number) => <Card item={item} type="playlist" {...(cardSize && ({ size: cardSize }))} key={i} />)}
                    {type === "artists" && obj.items.map((item: any, i: number) => <Card item={item} type="artist" {...(cardSize && ({ size: cardSize }))} key={i} />)}
                </div>
            )}
        </section>
    )
}