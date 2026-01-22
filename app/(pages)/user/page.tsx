import Image from "next/image"
import { fetchSpotify } from "@/app/api/fetches"
import { getCoverImage } from "@/utils/helpers"
import Wrapper from "@/components/Wrapper"
import UserTop from "./_components/UserTop"
import SectionWrapper from "@/components/SectionWrapper"
import PlaylistCard from "@/components/cards/PlaylistCard"

export const metadata = {
    title: "User"
}

export default async function UserPage() {
    const profile = await fetchSpotify("https://api.spotify.com/v1/me")
    console.log("profile", profile)

    const topArtists = await fetchSpotify("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10")
    console.log("topArtists", topArtists.items)
    const topTracks = await fetchSpotify("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10")
    console.log("topTracks", topTracks.items)
    
    const playlists = await fetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10")
    console.log("playlists", playlists.items)

    return (
        <Wrapper className="space-y-8">
            <div className="flex items-center gap-4">
                <Image
                    src={getCoverImage(profile.images).url}
                    alt={`${profile.display_name} profile picture`}
                    width={getCoverImage(profile.images).width}
                    height={getCoverImage(profile.images).height}
                    className="size-24 rounded-full"
                />
                <div>
                    <h1 className="heading-page text-lg">{profile.display_name}</h1>
                    <p className="text-xs">{profile.followers.total} followers</p>
                    <p className="text-xs text-grey-light">Subscription: {profile.product}</p>
                </div>
            </div>
            <UserTop initItems={topTracks.items} type="tracks" />
            <UserTop initItems={topArtists.items} type="artists" />

            <SectionWrapper heading={{ body: "Public Playlists", button: { body: "View All", href: "/music/playlists" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {playlists.items.map((item: any, i: number) => <PlaylistCard playlist={item} key={i} />)}
                </div>
            </SectionWrapper>
        </Wrapper>
    )
}