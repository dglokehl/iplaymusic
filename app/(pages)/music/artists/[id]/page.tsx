import Image from "next/image";
import { fetchSpotify } from "@/app/api/fetches"
import Wrapper from "@/components/Wrapper"
import TopTracks from "./TopTracks";
import GenreCard from "@/components/cards/GenreCard";
import AlbumCard from "@/components/cards/AlbumCard";
import SectionWrapper from "@/components/SectionWrapper";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const artist = await fetchSpotify(`https://api.spotify.com/v1/artists/${id}`)

    return {
        title: artist.name
    }
}

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("params/id:", id)

    const artist = await fetchSpotify(`https://api.spotify.com/v1/artists/${id}`)
    console.log("artist", artist)
    const artistTopTracks = await fetchSpotify(`https://api.spotify.com/v1/artists/${id}/top-tracks`)
    console.log("artistTopTracks", artistTopTracks.tracks)
    const artistAlbums = await fetchSpotify(`https://api.spotify.com/v1/artists/${id}/albums?limit=10`)
    console.log("artistAlbums", artistAlbums.items)

    return (
        <>
            <section className="mb-2 w-full relative max-xs:aspect-square xs:h-64">
                <Image
                    src={artist.images[0].url}
                    alt={`${artist.name} header image`}
                    width={artist.images[0].width}
                    height={artist.images[0].height}
                    className="size-full object-cover absolute top-0 inset-x-0 -z-1 mask-b-to-transparent"
                />
                <div className="pt-header px-default pb-9 h-full flex flex-col justify-between">
                    <div>
                        <h2 className="heading-page text-white">{artist.name}</h2>
                        <p className="mt-3 text-sm font-medium">{artist.followers.total} followers</p>
                    </div>
                    <div className="flex gap-2 overflow-x-scroll">
                        {artist.genres.map((genre: any, i: number) => <GenreCard body={genre} key={i} />)}
                    </div>
                </div>
            </section>
        
            <Wrapper title={artist.name} className="pt-0! space-y-5">
                <TopTracks tracks={artistTopTracks.tracks} />
                <SectionWrapper heading={{ body: "Discography", button: { body: "Show All", href: `/music/artists/${id}/albums` } }}>
                    <div className="flex overflow-x-scroll scrollbar-hidden">
                        {artistAlbums.items.map((album: any, i: number) => <AlbumCard album={album} key={i} />)}
                    </div>
                </SectionWrapper>
            </Wrapper>
        </>
    )
}