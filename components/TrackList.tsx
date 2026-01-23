import SongCard from "./cards/SongCard"

type TrackListProps = {
    tracks: any[];
    isAlbum?: boolean;
    className?: string;
}

export default function TrackList({ tracks, isAlbum, className }: TrackListProps) {
    return (
        <div className={`space-y-1 ${className ? className : ""}`}>
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