import { fetchSpotify } from "@/app/api/fetches";
import Wrapper from "@/components/Wrapper"
import ListPageItems from "../_components/ListPageItems";

export default async function PlaylistsPage() {
    const limit = 48
    const route = "me/playlists"

    const playlists = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log(playlists)

    return (
        <Wrapper>
            <h1 className="mb-6 heading-page">Your Playlists</h1>
            <ListPageItems
                initFetch={playlists}
                route={route}
                type="playlist"
            />
        </Wrapper>
    )
}