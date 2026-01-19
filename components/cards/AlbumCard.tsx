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
                    url: album.images[0].url,
                    alt: `${album.name} cover`,
                    width: album.images[0].width,
                    height: album.images[0].height
                },
                ...(size && ({ size: size }))
            }}
        />
    )
}