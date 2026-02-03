import BaseCard, { CardSize } from "./BaseCard"

export type ArtistCardProps = {
    id: string;
    images: any[];
    name: string;
    size?: CardSize;
}

export default function ArtistCard({ artist, size }: { artist: ArtistCardProps, size?: CardSize }) {
    if (!artist) return
    return (
        <BaseCard
            card={{
                href: `/music/artists/${artist.id}`,
                cover: {
                    images: artist.images,
                    alt: artist.name,
                    className: "rounded-full!"
                },
                heading: artist.name,
                ...(artist.size && ({ size: artist.size })),
            }}
            {...(size && ({ size: size }))}
        />
    )
}