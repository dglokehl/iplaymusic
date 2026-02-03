import { fetchSpotify } from "@/app/api/fetches"
import Main from "@/components/layout/Main"
import ReleaseListItems from "@/components/wrappers/ReleaseListItems"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artist = await fetchSpotify(`https://api.spotify.com/v1/artists/${id}`)

    return {
        title: `Discography · ${artist.name}`
    }
}

export default async function ArtistAlbumsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const limit = 48
    const route = `artists/${id}/albums`

    const artist = await fetchSpotify(`https://api.spotify.com/v1/artists/${id}`)
    const albums = await fetchSpotify(`https://api.spotify.com/v1/${route}?include_groups=album,single&limit=${limit}&offset=0`)
    // console.log("albums:", albums)

    return (
        <Main>
            <h1 className="heading-page">{artist.name}</h1>
            <ReleaseListItems
                initFetch={albums}
                route={route}
                type="artistAlbum"
            />
        </Main>
    )
}