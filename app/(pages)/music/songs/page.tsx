import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import ListPageItems from "../_components/ListPageItems"

export const metadata = {
    title: "Songs"
}

export default async function SongsPage() {
    const limit = 50
    const route = "me/tracks"

    const tracks = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log(tracks)

    return (
        <Main>
            <h1 className="heading-page">Your Liked Songs</h1>
            <ListPageItems
                initFetch={tracks}
                route={route}
                type="track"
            />
        </Main>
    )
}