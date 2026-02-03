import Link from "next/link"
import BaseCard, { CardSize } from "./BaseCard"

export type PlaylistCardProps = {
    id: string;
    images: any[];
    name: string;
    owner: {
        id: string;
        display_name: string;
    }
}

export default function PlaylistCard({ playlist, size }: { playlist: PlaylistCardProps, size?: CardSize }) {
    if (!playlist) return
    return (
        <BaseCard
            card={{
                href: `/music/playlists/${playlist.id}`,
                cover: {
                    images: playlist.images,
                    alt: playlist.name,
                },
                heading: playlist.name,
                subheading: <Link href={`/users/${playlist.owner.id}`} className="hover-75 pointer-events-auto">{playlist.owner.display_name}</Link>,
            }}
            {...(size && ({ size: size }))}
        />
    )
}