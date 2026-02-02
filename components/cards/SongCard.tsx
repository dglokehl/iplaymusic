import Link from "next/link";
import Image from "next/image";
import { formatMilliseconds, getCoverImage } from "@/utils/helpers";
import MapArtistLinks from "../map/MapArtistLinks";
import PlayButton from "../buttons/PlayButton";

type SongCardProps = {
    song: any;
    thumbnail?: boolean;
}

export default function SongCard({ song, thumbnail }: SongCardProps) {
    if (!song) return
    return (
        <div className="py-2 px-3 flex justify-between items-center gap-6 rounded-lg hover-bg">
            <div className="flex items-center flex-1">
                <PlayButton song={song} className="mr-4 shrink-0" />
                {thumbnail && (
                    <>
                        {song.album.id ? (
                            <Link href={`/music/albums/${song.album.id}`} className="hover-scale shrink-0">
                                <Image
                                    src={getCoverImage(song.album.images, "xs").url}
                                    alt={song.name}
                                    width={getCoverImage(song.album.images, "xs").width}
                                    height={getCoverImage(song.album.images, "xs").height}
                                    className="mr-2.5 size-10 rounded"
                                />
                            </Link>
                        ) : (
                            <Image
                                src={getCoverImage(song.album.images, "xs").url}
                                alt={song.name}
                                width={getCoverImage(song.album.images, "xs").width}
                                height={getCoverImage(song.album.images, "xs").height}
                                className="mr-2.5 size-10 rounded shrink-0"
                            />
                        )}
                    </>
                )}
                <div className="shrink">
                    <p className="text-sm font-bold line-clamp-1 text-clip break-all">{song.name}</p>
                    <p className="text-xs font-light text-grey-light line-clamp-1 text-clip break-all">
                        <MapArtistLinks artists={song.artists} />
                    </p>
                </div>
            </div>
            <p className="text-xs font-light text-grey-light shrink-0">{formatMilliseconds(song.duration_ms)}</p>
        </div>
    )
}