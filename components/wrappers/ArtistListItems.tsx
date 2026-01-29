"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { fetchServer } from "@/app/api/fetchServer"
import { MapArtistCards } from "@/components/map/MapCards"

type ArtistListItemsProps = {
    initFetch: {
        items: any[]
        limit: number;
        total: number;
        previous: string;
        next: string;
        cursors: {
            after: string | null;
        }
    };
    route: string;
}

export default function ArtistListItems({ initFetch, route }: ArtistListItemsProps) {
    const limit = initFetch.limit
    const [after, setAfter] = useState(initFetch.cursors.after)

    const [listItems, setListItems] = useState(initFetch.items)

    const [hasMore, setHasMore] = useState(initFetch.cursors.after ? true : false)
    const [loading, setLoading] = useState(false)
    
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchMore = useCallback(async () => {
        if (loading || !hasMore) return

        setLoading(true)

        const newFetch = await fetchServer(route, limit, 0, after)
        console.log("newFetch:", newFetch)
        setListItems(prev => [...prev, ...newFetch.items])

        setAfter(newFetch.cursors.after)
        if (!newFetch.cursors.after) setHasMore(false)

        setLoading(false)
    }, [loading, hasMore, after, limit, route])

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
                <MapArtistCards artists={listItems} size="lg" />
            </div>
            {hasMore && <div className="h-px" ref={observerRef}></div>}
        </>
    )
}