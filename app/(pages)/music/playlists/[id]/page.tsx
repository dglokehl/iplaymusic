import { fetchSpotify } from "@/app/api/fetches";
import DetailsPageLayout from "../../_components/DetailsPageLayout";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const playlist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}`)

    return {
        title: playlist.name
    }
}

export default async function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("params/id:", id)

    const playlist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}`)
    console.log(playlist)
    const userPlaylist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}/followers/contains`)
    const isFavorite = userPlaylist[0]

    return (
        <DetailsPageLayout
            name={playlist.name}
            image={{
                url: playlist.images[0].url
            }}
            playlist={{
                owner: {
                    id: playlist.owner.id,
                    display_name: playlist.owner.display_name
                },
                followers: {
                    total: playlist.followers.total
                },
                tracks: {
                    total: playlist.tracks.total
                }
            }}
            tracks={playlist.tracks.items}
            isFavorite={isFavorite}
        />
    )
}