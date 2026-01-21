import AlbumCard from "@/components/cards/AlbumCard"

type MapListPageItemsProps = {
    items: any[];
    className?: string;
}

export default function MapListPageItems({ items, className }: MapListPageItemsProps) {
    return items.map((album: any, i: number) => <AlbumCard album={album.album} key={i} />)
}