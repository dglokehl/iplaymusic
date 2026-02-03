"use client"

import { useState } from "react"
import AlbumCard from "@/components/cards/AlbumCard"
import PlaylistCard from "@/components/cards/PlaylistCard"
import ArtistCard from "@/components/cards/ArtistCard"
import SongCard from "@/components/cards/SongCard"

type SearchResultsProps = {
    results: {
        artists: {
            items: any[];
        }
        albums: {
            items: any[];
        }
        playlists: {
            items: any[];
        }
        tracks: {
            items: any[];
        }
    }
    className?: string;
}

const buttons = ["Artists", "Albums", "Playlists", "Songs"]

export default function SearchResults({ results, className }: SearchResultsProps) {
    let startIndex = 0
    if (results.artists.items.length < 1 ) startIndex = 1
    const [index, setIndex] = useState(startIndex);

    return (
        <div className={`space-y-4 ${className ? className : ""}`}>
            <div className="flex justify-center gap-2 flex-wrap sticky top-header z-999 pointer-events-none *:pointer-events-auto">
                {buttons.map((item: string, i: number) => (
                    <button className={`py-1.5 px-3 text-sm font-medium rounded-full hover-brightness ${index == i ? "bg-ipm-gradient" : "bg-ipm-magenta"}`} onClick={() => setIndex(i)} key={i}>
                        {item}
                    </button>
                ))}
            </div>

            <div className={index == 3 ? "space-y-1" : "card-grid"}>
                {index == 0 && results.artists.items.map((item: any, i: number) => (
                    <ArtistCard artist={item} size="lg" key={i} />
                ))}
                {index == 1 && results.albums.items.map((item: any, i: number) => (
                    <AlbumCard album={item} size="lg" key={i} />
                ))}
                {index == 2 && results.playlists.items.map((item: any, i: number) => (
                    <PlaylistCard playlist={item} size="lg" key={i} />
                ))}
                {index == 3 && results.tracks.items.map((item: any, i: number) => (
                    <SongCard song={item} thumbnail key={i} />
                ))}
            </div>
        </div>
    )
}