import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import ListPageItems from "../_components/ListPageItems"

export const metadata = {
    title: "Artists"
}

export default async function ArtistsPage() {
    const limit = 48
    const route = "me/following"

    const artists = await fetchSpotify(`https://api.spotify.com/v1/${route}?type=artist&limit=${limit}`)
    console.log(artists.artists)

    return (
        <Main>
            <h1 className="heading-page">Followed Artists</h1>
            <ListPageItems
                initFetch={artists.artists}
                route={route}
                type="artist"
            />
        </Main>
    )
}