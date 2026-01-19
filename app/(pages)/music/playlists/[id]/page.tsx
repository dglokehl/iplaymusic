import Link from "next/link";
import Image from "next/image";
import { fetchSpotify } from "@/app/api/fetches";
import Wrapper from "@/components/Wrapper";
import SongCard from "@/components/cards/SongCard";

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

    const playlist = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}`)
    console.log(playlist)
    // const userAlbum = await fetchSpotify(`https://api.spotify.com/v1/me/albums/contains?ids=${id}`)
    // const isFavorited = userAlbum[0]

    return (
        <Wrapper title={playlist.name}>
            <Image
                src="/sound-wave.png"
                alt="Background element"
                width={450}
                height={273}
                className="w-full absolute -top-10 inset-x-0 -z-1"
            />
            {/* <h2 className="mb-5 heading-page text-white">Playlists</h2> */}

            <section className="flex flex-col items-center gap-4">
                <Image
                    src={playlist.images[0].url}
                    alt="Background element"
                    width={300}
                    height={300}
                    className="size-39 rounded self-center hover-scale"
                />
                <div className="text-center">
                    <h2 className="text-xl font-bold">{playlist.name}</h2>
                    <Link href={`/user/${playlist.owner.id}`} className="text-sm text-grey-light hover-75">
                        {playlist.owner.display_name}
                    </Link>
                </div>
            </section>

            <div className="mt-8 space-y-1">
                {playlist.tracks.items.map((track: any, i: number) => <SongCard song={track.track} thumbnail={true} key={i} />)}
            </div>
        </Wrapper>
    )
}