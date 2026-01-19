import Link from "next/link";
import Image from "next/image";
import { getTotalLength, formatReleaseDate } from "@/utils/helpers";
import { getUserId } from "@/utils/cookies";
import Wrapper from "@/components/Wrapper";
import SongCard from "@/components/cards/SongCard";
import MapArtistLinks from "@/components/map/MapArtistLinks";
import FavoriteButton from "@/components/FavoriteButton";

type DetailsPageLayoutProps = {
    name: string;
    image: {
        url: string;
        width?: number;
        height?: number;
    }
    album?: {
        artists: any[]
        release_date: string;
        copyrights: {
            text: string;
        }[]
        album_type: string;
    }
    playlist?: {
        owner: {
            id: string;
            display_name: string;
        }
        tracks: {
            total: number;
        }
        followers: {
            total: number;
        }
    }
    tracks: any[];
    isFavorite: boolean;
}

export default async function DetailsPageLayout({ name, image, album, playlist, tracks, isFavorite }: DetailsPageLayoutProps) {
    const userId = await getUserId()

    return (
        <Wrapper title={name} className="space-y-6">
            <Image
                src="/sound-wave.png"
                alt="Background element"
                width={450}
                height={273}
                className={`w-full absolute ${album ? "top-0" : playlist && "-top-10"} inset-x-0 -z-1`}
            />

            <section className="flex flex-col items-center gap-4">
                <Image
                    src={image.url}
                    alt="Background element"
                    width={image.width ? image.width : 300}
                    height={image.height ? image.height : 300}
                    className={`${album ? "size-48" : playlist && "size-39"} rounded self-center hover-scale`}
                />
                <div className="text-center">
                    <h2 className="text-xl font-bold">{name}</h2>
                    {album ? (
                        <h3 className="text-sm text-grey-light">
                            <MapArtistLinks artists={album.artists} />
                        </h3>
                    ) : playlist && playlist && (
                        <Link href={`/user/${playlist.owner.id}`} className="text-sm text-grey-light hover-75">
                            {playlist.owner.display_name}
                        </Link>
                    )}
                </div>
                {playlist && playlist && playlist.owner.id === userId ? null : (
                    <div className="w-full flex justify-between items-center gap-8">
                        <div className="text-sm font-light text-grey-light">
                            {album && album ? (
                                <p className="capitalize">{album.album_type} · {formatReleaseDate(album.release_date, "year")}</p>
                            ) : playlist && playlist && playlist.followers.total > 0 && (
                                <p>{playlist.followers.total} saves</p>
                            )}
                        </div>
                        <FavoriteButton isFavorite={isFavorite} />
                    </div>
                )}
            </section>

            <div className="mt-8 space-y-1">
                {tracks.map((track: any, i: number) => <SongCard song={album ? track : playlist && track.track} thumbnail={playlist ? true : false} key={i} />)}
            </div>

            <div className="text-sm font-light text-grey-light">
                {album && album ? (
                    <>
                        <p>{formatReleaseDate(album.release_date)}</p>
                        <p>{getTotalLength(tracks)}</p>
                        <div className="mt-2 text-2xs">
                            {album.copyrights.map((copyright: any, i: number) => (
                                <p key={i}>{copyright.text}</p>
                            ))}
                        </div>
                    </>
                ) : playlist && playlist && (
                    <>
                        <p>{playlist.tracks.total} songs</p>
                        <p>{getTotalLength(tracks)}</p>
                    </>
                )}
            </div>
        </Wrapper>
    )
}