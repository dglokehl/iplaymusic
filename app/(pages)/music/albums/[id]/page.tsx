import { fetchSpotify } from "@/app/api/fetches";
import DetailsPageLayout from "../../_components/DetailsPageLayout";


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const album = await fetchSpotify(`https://api.spotify.com/v1/albums/${id}`)

    return {
        title: album.name
    }
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("params/id:", id)

    const album = await fetchSpotify(`https://api.spotify.com/v1/albums/${id}`)
    console.log(album)
    const userAlbum = await fetchSpotify(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`)
    const isFavorite = userAlbum[0]

    return (
        <DetailsPageLayout
            name={album.name}
            images={album.images}
            album={{
                artists: album.artists,
                release_date: album.release_date,
                copyrights: album.copyrights,
                album_type: album.album_type
            }}
            tracks={album.tracks.items}
            isFavorite={isFavorite}
        />
    )
}