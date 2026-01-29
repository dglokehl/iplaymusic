import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import ReleaseListItems from "@/components/wrappers/ReleaseListItems"

export const metadata = {
    title: "Albums"
}

export default async function UserAlbumsPage() {
    const limit = 48
    const route = "me/albums"

    const albums = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log("albums:", albums)

    return (
        <Main>
            <h1 className="heading-page">Your Albums</h1>
            <ReleaseListItems
                initFetch={albums}
                route={route}
                type="album"
            />
        </Main>
    )
}