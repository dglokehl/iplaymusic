import Image from "next/image";
import { IoPlay } from "react-icons/io5";
import { formatMilliseconds } from "@/utils/helpers";

type SongCardProps = {
    song: any;
    thumbnail?: boolean;
}

export default function SongCard({ song, thumbnail }: SongCardProps) {
    return (
        <div className="py-2 px-3 flex justify-between items-center gap-6 rounded-lg hover-bg">
            <div className="flex items-center">
                <figure className="mr-4 p-1 size-7 flex justify-center items-center bg-ipm-gradient rounded-full hover-brightness">
                    <IoPlay />
                </figure>
                {thumbnail &&
                    <Image
                        src={!song.is_local ? song.album.images[0].url : "/placeholder.png"}
                        alt="Background element"
                        width={!song.is_local ? song.album.images[0].width : 300}
                        height={!song.is_local ? song.album.images[0].height : 300}
                        className="mr-2.5 size-10 rounded"
                    />
                }
                <div className="flex-1">
                    <p className="text-sm font-bold line-clamp-1">{song.name}</p>
                    <p className="text-xs font-light text-grey-light line-clamp-1">{song.artists.map((artist: any, i: number) => i >= 1 ? `, ${artist.name}` : artist.name)}</p>
                </div>
            </div>
            <p className="text-xs font-light text-grey-light">{formatMilliseconds(song.duration_ms)}</p>
        </div>
    )
}