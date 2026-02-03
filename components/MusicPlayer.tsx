"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import { IoPlay, IoPause, IoPlayBack, IoPlayForward, IoShuffle, IoRepeat, IoClose } from "react-icons/io5";
import { formatMilliseconds } from "@/utils/helpers";
import MapArtistLinks from "./map/MapArtistLinks";
import CoverImage from "./CoverImage";
import Link from "next/link";

type MusicPlayerProps = {
    track?: {
        name: string;
        artists: any[];
        album: {
            images: any[]
            id: string;
        }
    }
    className?: string;
}

export default function MusicPlayer({ track, className }: MusicPlayerProps) {
    const playerRef = useRef<HTMLAudioElement>(null)
    const rangeRef = useRef<HTMLInputElement>(null)

    const [isPlaying, setIsPlaying] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [loop, setLoop] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);


    const togglePlayback = () => {
        // console.log("context:", context)
        if (!playerRef.current) return
        // if (duration == 0) setDuration(playerRef.current.duration * 1000)

        if (!isPlaying) {
            playerRef.current.play()
            setIsPlaying(true)
        }
        if (isPlaying){
            playerRef.current.pause()
            setIsPlaying(false)
        }
    }

    const toggleLoop = () => {
        if (!playerRef.current) return

        if (!loop) {
            playerRef.current.loop = true
            setLoop(true)
        }
        if (loop){
            playerRef.current.loop = false
            setLoop(false)
        }
        // console.log(playerRef.current.loop)
    }

    const scrollTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!playerRef.current) return

        playerRef.current.currentTime = Number(e.target.value) / 1000
    }

    const playerEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
    }

    const playerRestart = () => {
        if (!playerRef.current) return

        playerRef.current.pause()
        playerRef.current.currentTime = 0
        playerEnded()
    }


    return (
        <div className={`size-full flex flex-col justify-between items-center ${className ? className : ""}`}>
            <div className="w-full *:w-full flex-1 flex flex-col items-center">
                <div className="flex-1 flex justify-center items-center relative">
                    <Image
                        src="/sound-wave-player.png"
                        alt="Background element"
                        width={750}
                        height={503}
                        className="w-full absolute top-1/2 -translate-y-1/2 -z-1"
                    />
                    {track ? (
                        <Link href={`/music/albums/${track.album.id}`} className="max-w-80 max-2xs:max-w-56 w-full">
                            <CoverImage
                                images={track.album.images}
                                alt={track.name}
                                className="w-full rounded shadow-lg hover-scale"
                            />
                        </Link>
                    ) : (
                        <Image
                            src="/placeholder.png"
                            alt="Album cover"
                            width={400}
                            height={400}
                            className="max-w-80 max-2xs:max-w-56 w-full rounded shadow-lg hover-scale"
                        />
                    )}
                </div>

                <div className="px-6 flex flex-col items-center gap-5">
                    <div className="space-y-1 text-center">
                        <p className="text-xl font-bold">
                            {track ? track.name : "Song title"}
                        </p>
                        <p className="font-light text-grey-light">
                            {track ? <MapArtistLinks artists={track.artists} /> : "Artist"}
                        </p>
                    </div>

                    <div className="w-full *:w-full">
                        <input
                            type="range" name="range" id="range" ref={rangeRef}
                            value={currentTime} max={duration}
                            onChange={scrollTime}
                            className="block range-default"
                        />
                        {/* <progress value={currentTime} max={duration} className="h-1.5 bg-ipm-magenta-light progress-rounded-full progress-value-ipm-gradient"></progress> */}
                        <div className="flex justify-between text-xs font-light">
                            <p>{formatMilliseconds(currentTime)}</p>
                            <p>{formatMilliseconds(duration)}</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center gap-6 *:size-7 *:hover-75">
                        <IoShuffle className={shuffle ? "stroke-[url(#ipm-gradient)]" : ""} onClick={() => setShuffle(!shuffle)} />

                        <IoPlayBack onClick={playerRestart} />
                        <figure className="p-3 size-16! *:size-full flex justify-center items-center bg-ipm-gradient rounded-full" onClick={togglePlayback}>
                            {!isPlaying ? <IoPlay /> : <IoPause />}
                        </figure>
                        <IoPlayForward onClick={playerRestart} />

                        <IoRepeat className={loop ? "stroke-[url(#ipm-gradient)]" : ""} onClick={toggleLoop} />
                    </div>
                </div>
            </div>
            <audio
                src="/beat.mp3" ref={playerRef} preload="none"
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration * 1000)}
                onDurationChange={(e) => setDuration(e.currentTarget.duration * 1000)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime * 1000)}
                onEnded={playerEnded}
            ></audio>
        </div>
    )

}