"use client"

import { useState } from "react"
import SongCard from "@/components/cards/SongCard"
import { MapArtistCards } from "@/components/map/MapCards"

type UserTopProps = {
    initItems: any[];
    type: "artists" | "tracks";
    className?: string;
}

const timeRanges = [
    {
        body: "4 weeks",
        time_range: "short_term"
    },
    {
        body: "6 months",
        time_range: "medium_term"
    },
    {
        body: "1 year",
        time_range: "long_term"
    },
]

export default function UserTop({ initItems, type, className }: UserTopProps) {
    const [items, setItems] = useState(initItems);
    const [itemsShortTerm, setItemsShortTerm] = useState([]);
    const [itemsLongTerm, setItemsLongTerm] = useState([]);

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(1);

    const [loading, setLoading] = useState(false)

    const handleTimeRanges = async (i: number) => {
        if (loading) return
        setLoading(true)

        setIndex(i)

        if (i == 0 && itemsShortTerm.length > 0) {
            setItems(itemsShortTerm)
            setLoading(false)
            return
        }
        if (i == 1) {
            setItems(initItems)
            setLoading(false)
            return
        }
        if (i == 2 && itemsLongTerm.length > 0) {
            setItems(itemsLongTerm)
            setLoading(false)
            return
        }

        const res = await fetch(`http://127.0.0.1:3000/api/me/top/${type === "artists" ? "artists" : "tracks"}?time_range=${timeRanges[i].time_range}&limit=10`)
        const newFetch = await res.json()
        console.log("newFetch:", newFetch)

        if (i == 0) setItemsShortTerm(newFetch.items)
        if (i == 2) setItemsLongTerm(newFetch.items)
        setItems(newFetch.items)

        setLoading(false)
    }

    return (
        <section className={`space-y-2 ${className ? className : ""}`}>
            <h2 className="text-lg font-bold">{type === "artists" ? "Top Artists" : "Top Songs"}</h2>
            <div className="flex gap-2">
                {timeRanges.map((range, i) => (
                    <button
                        className={`py-1.5 px-3 text-xs whitespace-nowrap ${index == i ? "bg-ipm-gradient" : "bg-ipm-magenta"} rounded-full hover-brightness`}
                        onClick={() => handleTimeRanges(i)}
                        key={i}
                    >
                        {range.body}
                    </button>
                ))}
            </div>

            {type === "tracks" && items.length > 0 && (
                <div className="space-y-1">
                    {items.map((track: any, i: number) => !open ? i < 4 && <SongCard song={track} thumbnail key={i} /> : <SongCard song={track} thumbnail key={i} />)}
                    <p className="inline-block text-sm text-grey-light hover-75" onClick={() => setOpen(!open)}>{!open ? "Show more" : "Show less"}</p>
                </div>
            )}
            {type === "artists" && items.length > 0 && (
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    <MapArtistCards artists={items} />
                </div>
            )}

            {items.length == 0 && <p className="py-8 text-sm text-grey-light text-center">No results found.</p>}
        </section>
    )
}