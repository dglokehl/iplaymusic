import { fetchSpotify } from "@/app/api/fetches"
import MusicPlayer from "@/components/MusicPlayer"

export default async function SongPlayerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const track = await fetchSpotify(`https://api.spotify.com/v1/tracks/${id}`)
    console.log("track:", track)

    return (
        <main>
            <MusicPlayer track={track} className="min-h-dvh pb-28" />
        </main>
    )
}