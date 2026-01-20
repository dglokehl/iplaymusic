import { getCoverImage } from "@/utils/helpers"
import DefaultCard from "./DefaultCard"
import type { CardSize } from "./DefaultCard"

type AlbumCardProps = {
    album: any;
    size?: CardSize;
}

export default function AlbumCard({ album, size }: AlbumCardProps) {
    return (
        <DefaultCard
            item={{
                link: {
                    href: `/music/albums/${album.id}`
                },
                heading: album.name,
                subheading: album.artists.map((artist: any, i: number) => i >= 1 ? `, ${artist.name}` : artist.name),
                image: {
                    url: getCoverImage(album.images, size && size).url,
                    alt: `${album.name} cover`,
                    width: getCoverImage(album.images, size && size).width,
                    height: getCoverImage(album.images, size && size).height
                },
                ...(size && ({ size: size }))
            }}
        />
    )
}