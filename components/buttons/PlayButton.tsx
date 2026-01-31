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
// "use client"

// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import { useRef, useState, useCallback } from "react";
// import { IoPlay, IoPause } from "react-icons/io5";

// type PlayButtonProps = {
//     song: any;
//     className?: string;
// }

// export default function PlayButton({ song, className }: PlayButtonProps) {
//     const router = useRouter()
//     const pathname = usePathname()
//     const searchParams = useSearchParams()
 
//     // Get a new searchParams string by merging the current
//     // searchParams with a provided key/value pair
//     const createQueryString = useCallback(
//         (value: string) => {
//             const params = new URLSearchParams(searchParams.toString())
//             params.set("playing", value)
        
//             return params.toString()
//         },
//         [searchParams]
//     )

//     const [isPlaying, setIsPlaying] = useState(false);

//     const togglePlayer = () => {
//         console.log("song.name:", song.name)
//         if (!isPlaying) {
//             setIsPlaying(true)
//             createQueryString(song.id)
//             router.push(pathname + '?' + createQueryString(song.id), { scroll: false })
//         }
//         if (isPlaying){
//             setIsPlaying(false)
//             router.push(pathname, { scroll: false })
//         }
//     }

//     return (
//         <figure className={`p-1 size-7 flex justify-center items-center bg-ipm-gradient rounded-full hover-brightness ${className ? className : ""}`} onClick={togglePlayer}>
//             {!isPlaying ? <IoPlay /> : <IoPause />}
//         </figure>
//     )
// }