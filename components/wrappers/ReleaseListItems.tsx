"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { fetchServer } from "@/app/api/fetchServer"
import { MapAlbumCards, MapPlaylistCards } from "@/components/map/MapCards"

type ReleaseListItemsProps = {
    initFetch: {
        items: any[]
        limit: number;
        offset: number;
        total: number;
        previous: string;
        next: string;
    };
    route: string;
    type: "album" | "playlist"
}

export default function ReleaseListItems({ initFetch, route, type }: ReleaseListItemsProps) {
    const limit = initFetch.limit
    const [offset, setOffset] = useState(initFetch.offset)

    const [listItems, setListItems] = useState(initFetch.items)

    const [hasMore, setHasMore] = useState((initFetch.offset + limit) < initFetch.total)
    const [loading, setLoading] = useState(false)
    
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchMore = useCallback(async () => {
        if (loading || !hasMore) return

        setLoading(true)

        const nextOffset = offset + limit

        const newFetch = await fetchServer(route, limit, nextOffset)
        console.log("newFetch:", newFetch)
        setListItems(prev => [...prev, ...newFetch.items])

        setOffset(nextOffset)
        if (nextOffset + limit >= newFetch.total) setHasMore(false)
        setLoading(false)
    }, [loading, hasMore, offset, limit, route])

    useEffect(() => {
        if (!observerRef.current || loading || !hasMore) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchMore()
                }
            },
            {
                root: null,
                rootMargin: "1000px 0px",
                threshold: 0,
            }
        )
        observer.observe(observerRef.current)

        return () => observer.disconnect()
    }, [fetchMore, loading, hasMore])

    return (
        <>
            <div className="card-grid">
                {type === "album" && <MapAlbumCards albums={listItems} size="lg" userAlbums />}
                {type === "playlist" && <MapPlaylistCards playlists={listItems} size="lg" />}
            </div>
            {hasMore && <div className="h-px" ref={observerRef}></div>}
        </>
    )
}