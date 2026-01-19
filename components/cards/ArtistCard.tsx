import DefaultCard from "./DefaultCard"
import type { CardSize } from "./DefaultCard"

type ArtistCardProps = {
    artist: any;
    size?: CardSize;
}

export default async function ArtistCard({ artist, size }: ArtistCardProps) {
    return (
        <DefaultCard
            item={{
                link: {
                    href: `/music/artists/${artist.id}`,
                },
                heading: artist.name,
                image: {
                    url: artist.images[0].url,
                    alt: `${artist.name} cover`,
                    width: 300,
                    height: 300,
                    className: "rounded-full"
                },
                ...(size && ({ size: size }))
            }}
        />
    )
}