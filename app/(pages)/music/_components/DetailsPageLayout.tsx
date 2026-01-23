import Link from "next/link";
import Image from "next/image";
import { getTotalLength, formatReleaseDate, getCoverImage } from "@/utils/helpers";
import { getUserId } from "@/utils/cookies";
import Main from "@/components/layout/Main";
import MapArtistLinks from "@/components/map/MapArtistLinks";
import FavoriteButton from "@/components/FavoriteButton";
import TrackList from "@/components/TrackList";

type DetailsPageLayoutProps = {
    name: string;
    images: {
        url: string;
        width?: number;
        height?: number;
    }[]
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

export default async function DetailsPageLayout({ name, images, album, playlist, tracks, isFavorite }: DetailsPageLayoutProps) {
    const userId = await getUserId()

    return (
        <Main>
            <Image
                src="/sound-wave.png"
                alt="Background element"
                width={450}
                height={273}
                quality={100}
                className={`wrapper-default w-full absolute ${album ? "top-0" : playlist && "-top-10"} 2xs:-top-32 xs:-top-48 md:-top-64 lg:-top-96 inset-x-0 -z-1`}
            />

            <section className="flex flex-col items-center gap-4">
                <Image
                    src={getCoverImage(images).url}
                    alt="Background element"
                    width={getCoverImage(images).width}
                    height={getCoverImage(images).height}
                    className={`${album ? "size-48" : playlist && "size-39"} sm:size-56 object-cover rounded hover-scale`}
                />
                <div className="text-center">
                    <h2 className="text-xl font-bold">{name}</h2>
                    {album ? (
                        <h3 className="text-sm text-grey-light">
                            <MapArtistLinks artists={album.artists} />
                        </h3>
                    ) : playlist && playlist && (
                        <Link href={`/users/${playlist.owner.id}`} className="text-sm text-grey-light hover-75">
                            {playlist.owner.display_name}
                        </Link>
                    )}
                </div>
                {playlist && playlist.owner.id !== userId && (
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

            <TrackList tracks={tracks} isAlbum={album && true} />

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
        </Main>
    )
}