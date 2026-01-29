import Image from "next/image";
import Link from "next/link";
import { fetchSpotify } from "@/app/api/fetches";
import { getCoverImage, getTotalLength } from "@/utils/helpers";
import FavoriteButton from "@/components/FavoriteButton";
import DetailsPageLayout from "../../_components/DetailsPageLayout";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const playlist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}`)

    return {
        title: playlist.name
    }
}

export default async function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("params/id:", id)

    const playlistDetails = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}?fields=collaborative,description,followers,images,name,owner,public`)
    console.log("playlistDetails:", playlistDetails)

    const limit = 50
    const playlistItems = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=0`)
    console.log("playlistItems:", playlistItems)

    const userPlaylist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}/followers/contains`)
    const isFavorite = userPlaylist[0]

    return (
        <DetailsPageLayout
            type="playlist"
            tracks={playlistItems}
            id={id}
            topContent={
                <>
                    <Image
                        src={getCoverImage(playlistDetails.images).url}
                        alt="Background element"
                        width={getCoverImage(playlistDetails.images).width}
                        height={getCoverImage(playlistDetails.images).height}
                        className="size-48 sm:size-56 object-cover rounded hover-scale"
                    />
                    <div className="text-center">
                        <h2 className="text-xl font-bold">{playlistDetails.name}</h2>
                        <Link href={`/users/${playlistDetails.owner.id}`} className="text-sm text-grey-light hover-75">
                            {playlistDetails.owner.display_name}
                        </Link>
                    </div>
                    <div className="w-full flex justify-between items-center gap-8">
                        <p className="text-sm font-light text-grey-light">{playlistDetails.followers.total} saves</p>
                        <FavoriteButton isFavorite={isFavorite} />
                    </div>
                </>
            }
            bottomContent={
                <>
                    <p>{playlistItems.total} songs</p>
                    <p>{getTotalLength(playlistItems.items)}</p>
                </>
            }
        />
    )
}