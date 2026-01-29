import Image from "next/image";
import Main from "@/components/layout/Main";
import TrackList from "@/components/wrappers/TrackList";
import TrackListLong from "@/components/wrappers/TrackListLong";

type DetailsPageLayoutProps = {
    type: "album" | "playlist";
    tracks: {
        items: any[]
        limit: number;
        offset: number;
        total: number;
        previous: string;
        next: string;
    }
    id: string;
    topContent: React.ReactNode;
    bottomContent: React.ReactNode;
}

export default async function DetailsPageLayout({ type, tracks, id, topContent, bottomContent }: DetailsPageLayoutProps) {
    return (
        <Main>
            <Image
                src="/sound-wave.png"
                alt="Background element"
                width={450}
                height={273}
                quality={100}
                className={`wrapper-default w-full absolute ${type === "album" ? "top-0" : "-top-10"} 2xs:-top-32 xs:-top-48 md:-top-64 lg:-top-96 inset-x-0 -z-1`}
            />

            <section className="flex flex-col items-center gap-4">
                {topContent}
            </section>

            {tracks.limit < tracks.total ? (
                <TrackListLong
                    initFetch={tracks}
                    route={type === "album" ? `albums/${id}/tracks` : `playlists/${id}/tracks`}
                    isAlbum={type === "album" && true}
                />
            ) : (
                <TrackList tracks={tracks.items} isAlbum={type === "album" && true} />
            )}

            <div className="text-sm font-light text-grey-light">
                {bottomContent}
            </div>
        </Main>
    )
}