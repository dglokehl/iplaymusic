import SongCard from "@/components/cards/SongCard"
import Card from "@/components/cards/Card"

export type ListPageType = "album" | "playlist" | "artist" | "track"

type MapListPageItemsProps = {
    listItems: any[]
    type: ListPageType
}

export default function MapListPageItems({ listItems, type }: MapListPageItemsProps) {
    if (type === "album") return listItems.map((item: any, i: number) => <Card item={item.album} type="album" size="lg" key={i} />)
    if (type === "playlist") return listItems.map((item: any, i: number) => <Card item={item} type="playlist" size="lg" key={i} />)
    if (type === "artist") return listItems.map((item: any, i: number) => <Card item={item} type="artist" size="lg" key={i} />)
    if (type === "track") return listItems.map((item: any, i: number) => <SongCard song={item.track} thumbnail key={i} />)
    return
}