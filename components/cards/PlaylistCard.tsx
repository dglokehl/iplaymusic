import DefaultCard from "./DefaultCard"
import type { CardSize } from "./DefaultCard"

type PlaylistCardProps = {
    playlist: any;
    size?: CardSize;
}

export default async function PlaylistCard({ playlist, size }: PlaylistCardProps) {
    return (
        <DefaultCard
            item={{
                link: {
                    href: `/music/playlists/${playlist.id}`,
                },
                heading: playlist.name,
                subheading: playlist.owner.display_name,
                image: {
                    url: playlist.images[0].url,
                    alt: `${playlist.name} cover`,
                    width: 300,
                    height: 300
                },
                ...(size && ({ size: size }))
            }}
        />
    )
}