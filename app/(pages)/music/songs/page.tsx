import { fetchSpotify } from "@/app/api/fetches"
import Wrapper from "@/components/Wrapper"
import ListPageItems from "../_components/ListPageItems"

export default async function SongsPage() {
    const limit = 50
    const route = "me/tracks"

    const tracks = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log(tracks)

    return (
        <Wrapper>
            <h1 className="mb-6 heading-page">Your Liked Songs</h1>
            <ListPageItems
                initFetch={tracks}
                route={route}
                type="track"
            />
        </Wrapper>
    )
}