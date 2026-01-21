"use client"

import { useState, useEffect } from "react"
import { fetchServer } from "@/app/api/fetchServer"
import MapListPageItems from "./MapListPageItems"
import AlbumCard from "@/components/cards/AlbumCard"

type ListPageLayoutProps = {
    initFetch: any[];
    limit: number;
    initOffset: number;
    className?: string;
}

export default function ListPageLayout({ initFetch, limit, initOffset, className }: ListPageLayoutProps) {
    const [listItems, setListItems] = useState(initFetch);
    const [offset, setOffset] = useState(initOffset);

    const handleButton = async () => {
        setOffset(offset + limit)
        // console.log("offset:", offset)

        const newItems = await fetchServer("albums", limit, offset + limit)
        setListItems((prevState) => [...prevState, ...newItems.items])
    }

    return (
        <div className="flex flex-col justify-center">
            <div className={`flex justify-center flex-wrap ${className ? className : ""}`}>
                {/* <MapListPageItems items={listItems} /> */}
                {listItems.map((item: any, i: number) => <AlbumCard album={item.album} size="sm" key={i} />)}
            </div>
            <button className="mt-4 py-2 px-5 inline-block border border-white rounded-full hover-75" onClick={handleButton}>Show more</button>
        </div>
    )
}