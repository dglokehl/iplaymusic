import { fetchSpotify } from "@/app/api/fetches";
import Main from "@/components/layout/Main";
import ReleaseListItems from "@/components/wrappers/ReleaseListItems"

export const metadata = {
    title: "Playlists"
}

export default async function UserPlaylistsPage() {
    const limit = 48
    const route = "me/playlists"

    const playlists = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    // console.log("playlists:", playlists)

    return (
        <Main>
            <h1 className="heading-page">Your Playlists</h1>
            <ReleaseListItems
                initFetch={playlists}
                route={route}
                type="playlist"
            />
        </Main>
    )
}