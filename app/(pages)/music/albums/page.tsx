import { fetchSpotify } from "@/app/api/fetches"
import Wrapper from "@/components/Wrapper"
import ListPageLayout from "../_components/ListPageLayout"

export default async function AlbumsPage() {
    let limit = 48
    let offset = 0

    const albums = await fetchSpotify(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`)

    return (
        <Wrapper title="Albums">
            <h1 className="mb-6 heading-page">Your Albums</h1>
            <ListPageLayout
                initFetch={albums.items}
                limit={limit}
                initOffset={offset}
            />
        </Wrapper>
    )
}