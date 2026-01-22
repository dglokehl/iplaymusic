import { getCoverImage } from "@/utils/helpers";
import DefaultCard from "./DefaultCard"
import type { CardSize } from "./DefaultCard"

type PlaylistCardProps = {
    playlist: any;
    size?: CardSize;
}

export default function PlaylistCard({ playlist, size }: PlaylistCardProps) {
    return (
        <DefaultCard
            item={{
                link: {
                    href: `/music/playlists/${playlist.id}`,
                },
                heading: playlist.name,
                subheading: playlist.owner.display_name,
                image: {
                    url: getCoverImage(playlist.images, size && size).url,
                    alt: `${playlist.name} cover`,
                    width: getCoverImage(playlist.images, size && size).width,
                    height: getCoverImage(playlist.images, size && size).height
                },
                ...(size && ({ size: size }))
            }}
        />
    )
}