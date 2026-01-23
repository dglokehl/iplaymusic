import Link from "next/link"
import { Fragment } from "react"

type MapArtistLinksProps = {
    artists: any[];
    className?: string;
}

export default function MapArtistLinks({ artists, className }: MapArtistLinksProps) {
    return artists.map((artist: any, i: number) => (
        <Fragment key={i}>
            <Link href={`/music/artists/${artist.id}`} className={`hover-75 ${className ? className : ""}`}>
                {artist.name}
            </Link>
            {i < artists.length - 1 && ", "}
        </Fragment>
    ))
}