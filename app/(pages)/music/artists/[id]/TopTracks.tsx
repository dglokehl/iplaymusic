"use client"

import { useState } from "react";
import SongCard from "@/components/cards/SongCard";

type TopTracksProps = {
    tracks: any;
    className?: string;
}

export default function TopTracks({ tracks, className }: TopTracksProps) {
    const [open, setOpen] = useState(false);

    return (
       <section className="space-y-1">
            <h3 className="font-bold">Top Songs</h3>
            {tracks.map((track: any, i: number) => !open ? i < 4 && <SongCard song={track} key={i} /> : <SongCard song={track} key={i} />)}
            <p className="inline-block text-sm text-grey-light hover-75" onClick={() => setOpen(!open)}>{!open ? "Show more" : "Show less"}</p>
        </section>
    )
}