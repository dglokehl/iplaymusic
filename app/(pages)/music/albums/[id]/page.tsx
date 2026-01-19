import Link from "next/link";
import Image from "next/image";
import { fetchSpotify } from "@/app/api/fetches";
import Wrapper from "@/components/Wrapper";
import SongCard from "@/components/cards/SongCard";
import FavoriteButton from "@/components/FavoriteButton";


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
        <Wrapper title={album.name} className="space-y-8">
            <Image
                src="/sound-wave.png"
                alt="Background element"
                width={450}
                height={273}
                className="w-full absolute top-0 inset-x-0 -z-1"
            />

            <section className="flex flex-col items-center gap-4">
                <Image
                    src={album.images[0].url}
                    alt="Background element"
                    width={300}
                    height={300}
                    className="size-48 rounded self-center hover-scale"
                />
                <div className="text-center">
                    <h2 className="text-xl font-bold">{album.name}</h2>
                    <h3 className="text-base text-grey-light">
                        {album.artists.map((artist: any, i: number) => (
                            <Link href={`/music/artists/${artist.id}`} className="hover-75" key={i}>
                                {i >= 1 ? `, ${artist.name}` : artist.name}
                            </Link>
                        ))}
                    </h3>
                </div>
            </section>

            <div className="space-y-1">
                {album.tracks.items.map((track: any, i: number) => <SongCard song={track} key={i} />)}
            </div>

            <div className="flex justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                    <div className="font-light text-grey-light">
                        <p className="text-sm">{album.release_date}</p>
                        {album.copyrights.map((copyright: any, i: number) => (
                            <p className="text-2xs" key={i}>{copyright.text}</p>
                        ))}
                    </div>
                </div>
                <FavoriteButton isFavorite={isFavorite} />
            </div>
        </Wrapper>
    )
}