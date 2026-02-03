import Link from "next/link";
import { IoPlay, IoPause } from "react-icons/io5";

type PlayButtonProps = {
    song: any;
    className?: string;
}

export default function PlayButton({ song, className }: PlayButtonProps) {
    return (
        <Link href={`/music/songs/${song.id}`} className={`p-1 size-7 flex justify-center items-center bg-ipm-gradient rounded-full hover-brightness ${className ? className : ""}`}>
            <IoPlay />
        </Link>
    )
}