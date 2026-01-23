import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import ListPageItems from "../_components/ListPageItems"

export const metadata = {
    title: "Albums"
}

export default async function AlbumsPage() {
    const limit = 48
    const route = "me/albums"

    const albums = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log(albums)

    return (
        <Main>
            <h1 className="heading-page">Your Albums</h1>
            <ListPageItems
                initFetch={albums}
                route={route}
                type="album"
            />
        </Main>
    )
}