"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { fetchServer } from "@/app/api/fetchServer"
import type { ListPageType } from "./MapListPageItems"
import MapListPageItems from "./MapListPageItems"

type ListPageItemsProps = {
    initFetch: {
        items: any[]
        limit: number;
        offset: number;
        total: number;
        previous: string;
        next: string;
        cursors: {
            after: string | null;
        }
    };
    route: string;
    type: ListPageType;
    className?: string;
}

export default function ListPageItems({ initFetch, route, type, className }: ListPageItemsProps) {
    const limit = initFetch.limit
    const [offset, setOffset] = useState(type !== "artist" ? initFetch.offset : 0)
    const [after, setAfter] = useState(type === "artist" ? initFetch.cursors.after : "")

    const [listItems, setListItems] = useState(initFetch.items)

    const [hasMore, setHasMore] = useState(type === "artist" ? initFetch.cursors.after : initFetch.offset + limit < initFetch.total)
    const [loading, setLoading] = useState(false)
    
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchMore = useCallback(async () => {
        if (loading || !hasMore) return

        setLoading(true)

        const nextOffset = offset + limit

        const newFetch = await fetchServer(route, limit, nextOffset, type === "artist" ? after : null)
        console.log("newFetch", newFetch)
        setListItems(prev => [...prev, ...type === "artist" ? newFetch.items : newFetch.items])

        setOffset(nextOffset)
        if (type === "artist") setAfter(newFetch.cursors.after)

        if (type === "artist" ? initFetch.cursors.after : nextOffset + limit >= newFetch.total) setHasMore(false)
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
            <div className={`${type === "track" ? "space-y-1" : "grid grid-cols-2 2xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6"} ${className ? className : ""}`}>
                <MapListPageItems listItems={listItems} type={type} />
            </div>
            {hasMore && <div className="h-px" ref={observerRef}></div>}
        </>
    )
}