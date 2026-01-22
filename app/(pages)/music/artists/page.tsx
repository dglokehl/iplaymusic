import { fetchSpotify } from "@/app/api/fetches"
import Wrapper from "@/components/Wrapper"
import ListPageItems from "../_components/ListPageItems"

export default async function ArtistsPage() {
    const limit = 2
    const route = "me/following"

    const artists = await fetchSpotify(`https://api.spotify.com/v1/${route}?type=artist&limit=${limit}`)
    console.log(artists.artists)

    return (
        <Wrapper title="Albums">
            <h1 className="mb-6 heading-page">Followed Artists</h1>
            <ListPageItems
                initFetch={artists.artists}
                route={route}
                type="artist"
            />
        </Wrapper>
    )
}