import Image from "next/image";
import { formatMilliseconds, getCoverImage } from "@/utils/helpers";
import MapArtistLinks from "../map/MapArtistLinks";
import PlayButton from "../buttons/PlayButton";

type SongCardProps = {
    song: any;
    thumbnail?: boolean;
}

export default function SongCard({ song, thumbnail }: SongCardProps) {
    return (
        <div className="py-2 px-3 flex justify-between items-center gap-6 rounded-lg hover-bg">
            <div className="flex items-center">
                <PlayButton song={song} className="mr-4" />
                {thumbnail &&
                    <Image
                        src={getCoverImage(song.album.images, "xs").url}
                        alt="Background element"
                        width={getCoverImage(song.album.images, "xs").width}
                        height={getCoverImage(song.album.images, "xs").height}
                        className="mr-2.5 size-10 rounded"
                    />
                }
                <div className="flex-1">
                    <p className="text-sm font-bold line-clamp-1">{song.name}</p>
                    <p className="text-xs font-light text-grey-light line-clamp-1">
                        <MapArtistLinks artists={song.artists} />
                    </p>
                </div>
            </div>
            <p className="text-xs font-light text-grey-light">{formatMilliseconds(song.duration_ms)}</p>
        </div>
    )
}