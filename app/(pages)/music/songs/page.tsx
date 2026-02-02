import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import TrackListLong from "@/components/wrappers/TrackListLong"

export const metadata = {
    title: "Songs"
}

export default async function UserSongsPage() {
    const limit = 50
    const route = "me/tracks"

    const tracks = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    // console.log("tracks:", tracks)

    return (
        <Main>
            <h1 className="heading-page">Your Liked Songs</h1>
            <TrackListLong
                initFetch={tracks}
                route={route}
            />
        </Main>
    )
}