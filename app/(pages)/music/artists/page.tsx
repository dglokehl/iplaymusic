import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import ArtistListItems from "@/components/wrappers/ArtistListItems"

export const metadata = {
    title: "Artists"
}

export default async function UserArtistsPage() {
    const limit = 48
    const route = "me/following"

    const artists = await fetchSpotify(`https://api.spotify.com/v1/${route}?type=artist&limit=${limit}`)
    console.log("artists:", artists.artists)

    return (
        <Main>
            <h1 className="heading-page">Followed Artists</h1>
            <ArtistListItems
                initFetch={artists.artists}
                route={route}
            />
        </Main>
    )
}