import BaseCard, { CardSize } from "./BaseCard"
import MapArtistLinks from "../map/MapArtistLinks"
import { formatReleaseDate } from "@/utils/helpers"

export type AlbumCardProps = {
    id: string;
    images: any[];
    name: string;
    artists: any[];
}

export default function AlbumCard({ album, size }: { album: AlbumCardProps, size?: CardSize }) {
    if (!album) return
    return (
        <BaseCard
            card={{
                href: `/music/albums/${album.id}`,
                cover: {
                    images: album.images,
                    alt: album.name,
                },
                heading: album.name,
                subheading: <MapArtistLinks artists={album.artists} className="pointer-events-auto" />,
            }}
            {...(size && ({ size: size }))}
        />
    )
}


export type ArtistAlbumCardProps = {
    id: string;
    images: any[];
    name: string;
    release_date: string;
    album_type: string;
}

export function ArtistAlbumCard({ album, size }: { album: ArtistAlbumCardProps, size?: CardSize }) {
    if (!album) return
    return (
        <BaseCard
            card={{
                href: `/music/albums/${album.id}`,
                cover: {
                    images: album.images,
                    alt: `${album.name} cover`,
                },
                heading: album.name,
                subheading: <>{formatReleaseDate(album.release_date, "year")} · <span className="capitalize">{album.album_type}</span></>,
            }}
            {...(size && ({ size: size }))}
        />
    )
}