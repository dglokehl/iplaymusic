"use client"

import { useState } from "react";
import SongCard from "@/components/cards/SongCard";
import TrackList from "@/components/wrappers/TrackList";

type TopTracksProps = {
    tracks: any;
    className?: string;
}

export default function TopTracks({ tracks, className }: TopTracksProps) {
    const [open, setOpen] = useState(false);

    const listLength = 4
    if (tracks.length < listLength) return <TrackList tracks={tracks} />

    return (
       <div className="space-y-1">
            {tracks.map((track: any, i: number) => !open ? i < listLength && <SongCard song={track} thumbnail key={i} /> : <SongCard song={track} thumbnail key={i} />)}
            <p className="inline-block text-sm text-grey-light hover-75" onClick={() => setOpen(!open)}>{!open ? "Show more" : "Show less"}</p>
        </div>
    )
}