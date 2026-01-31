import Image from "next/image";
import { fetchSpotify } from "@/app/api/fetches";
import { getCoverImage, formatReleaseDate, getTotalLength } from "@/utils/helpers";
import MapArtistLinks from "@/components/map/MapArtistLinks";
import FavoriteButton from "@/components/buttons/FavoriteButton";
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
    console.log("album:", album)

    const limit = 50
    const albumTracks = await fetchSpotify(`https://api.spotify.com/v1/albums/${id}/tracks?limit=${limit}&offset=0`)
    console.log("albumTracks:", albumTracks)

    const userAlbum = await fetchSpotify(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`)
    const isFavorite = userAlbum[0]

    return (
        <DetailsPageLayout
            type="album"
            tracks={albumTracks}
            id={id}
            topContent={
                <>
                    <Image
                        src={getCoverImage(album.images).url}
                        alt="Background element"
                        width={getCoverImage(album.images).width}
                        height={getCoverImage(album.images).height}
                        className="size-48 sm:size-56 object-cover rounded hover-scale"
                    />
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{album.name}</h2>
                        <h3 className="text-sm text-grey-light">
                            <MapArtistLinks artists={album.artists} />
                        </h3>
                    </div>
                    <div className="w-full flex justify-between items-center gap-8">
                        <p className="text-sm font-light text-grey-light capitalize">{album.album_type} · {formatReleaseDate(album.release_date, "year")}</p>
                        <FavoriteButton isFavorite={isFavorite} />
                    </div>
                </>
            }
            bottomContent={
                <>
                    <p>{formatReleaseDate(album.release_date)}</p>
                    <p>{getTotalLength(album.tracks.items)}</p>
                    <div className="mt-2 text-2xs">
                        {album.copyrights.map((copyright: any, i: number) => (
                            <p key={i}>{copyright.text}</p>
                        ))}
                    </div>
                </>
            }
        />
    )
}