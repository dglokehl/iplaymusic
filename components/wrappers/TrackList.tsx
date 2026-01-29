import SongCard from "@/components/cards/SongCard"

type TrackListProps = {
    tracks: any[];
    isAlbum?: boolean;
}

export default function TrackList({ tracks, isAlbum }: TrackListProps) {
    return (
        <div className="space-y-1">
            {tracks.map((item: any, i: number) => (
                <SongCard
                    song={item.track ? item.track : item}
                    thumbnail={isAlbum ? false : true}
                    key={i}
                />
            ))}
        </div>
    )
}