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

    const playlistDetails = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}?fields=collaborative,description,followers,images,name,owner,public`)
    console.log("playlistDetails:", playlistDetails)

    const playlistItems = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50&offset=0`)
    console.log("playlistItems:", playlistItems)

    const userPlaylist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}/followers/contains`)
    const isFavorite = userPlaylist[0]

    return (
        <DetailsPageLayout
            name={playlistDetails.name}
            images={playlistDetails.images}
            playlist={{
                owner: {
                    id: playlistDetails.owner.id,
                    display_name: playlistDetails.owner.display_name
                },
                followers: {
                    total: playlistDetails.followers.total
                },
                tracks: {
                    total: playlistItems.total
                }
            }}
            tracks={playlistItems.items}
            isFavorite={isFavorite}
        />
    )
}