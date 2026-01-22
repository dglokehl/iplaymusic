import { fetchSpotify } from "@/app/api/fetches"
import Wrapper from "@/components/Wrapper"
import ListPageItems from "../_components/ListPageItems"

export default async function AlbumsPage() {
    const limit = 48
    const route = "me/albums"

    const albums = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log(albums)

    return (
        <Wrapper title="Albums">
            <h1 className="mb-6 heading-page">Your Albums</h1>
            <ListPageItems
                initFetch={albums}
                route={route}
                type="album"
            />
        </Wrapper>
    )
}