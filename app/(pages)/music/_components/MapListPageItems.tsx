import AlbumCard from "@/components/cards/AlbumCard"
import PlaylistCard from "@/components/cards/PlaylistCard"
import ArtistCard from "@/components/cards/ArtistCard"
import SongCard from "@/components/cards/SongCard"

export type ListPageType = "album" | "playlist" | "artist" | "track"

type MapListPageItemsProps = {
    listItems: any[]
    type: ListPageType
}

export default function MapListPageItems({ listItems, type }: MapListPageItemsProps) {
    if (type === "album") return listItems.map((item: any, i: number) => <AlbumCard album={item.album} size="lg" key={i} />)
    if (type === "playlist") return listItems.map((item: any, i: number) => <PlaylistCard playlist={item} size="lg" key={i} />)
    if (type === "artist") return listItems.map((item: any, i: number) => <ArtistCard artist={item} size="lg" key={i} />)
    if (type === "track") return listItems.map((item: any, i: number) => <SongCard song={item.track} thumbnail key={i} />)
    return
}