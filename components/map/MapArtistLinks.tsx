import Link from "next/link"
import React from "react"

export default function MapArtistLinks({ artists }: { artists: any[] }) {
    return artists.map((artist: any, i: number) => (
        <React.Fragment key={i}>
            <Link href={`/music/artists/${artist.id}`} className="hover-75">
                {artist.name}
            </Link>
            {i < artists.length - 1 && ", "}
        </React.Fragment>
    ))
}