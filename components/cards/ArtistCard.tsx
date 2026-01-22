import { getCoverImage } from "@/utils/helpers"
import DefaultCard from "./DefaultCard"
import type { CardSize } from "./DefaultCard"

type ArtistCardProps = {
    artist: any;
    size?: CardSize;
}

export default function ArtistCard({ artist, size }: ArtistCardProps) {
    return (
        <DefaultCard
            item={{
                link: {
                    href: `/music/artists/${artist.id}`,
                },
                heading: artist.name,
                image: {
                    url: getCoverImage(artist.images, size && size).url,
                    alt: `${artist.name} cover`,
                    width: getCoverImage(artist.images, size && size).width,
                    height: getCoverImage(artist.images, size && size).height,
                    className: "rounded-full"
                },
                ...(size && ({ size: size }))
            }}
        />
    )
}