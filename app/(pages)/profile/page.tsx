import { fetchSpotify } from "@/app/api/fetches"
import { getCoverImage } from "@/utils/helpers"
import Main from "@/components/layout/Main"
import UserTop from "./_components/UserTop"
import BaseSection from "@/components/wrappers/BaseSection"
import { MapPlaylistCards } from "@/components/map/MapCards"

export const metadata = {
    title: "Profile"
}

export default async function ProfilePage() {
    const profile = await fetchSpotify("https://api.spotify.com/v1/me")
    console.log("profile:", profile)

    const topArtists = await fetchSpotify("https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10")
    console.log("topArtists:", topArtists.items)
    const topTracks = await fetchSpotify("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10")
    console.log("topTracks:", topTracks.items)
    
    const playlists = await fetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10")
    console.log("playlists:", playlists.items)

    return (
        <Main className="space-y-8">
            <div className="flex items-center gap-4">
                <img
                    src={getCoverImage(profile.images).url}
                    alt={profile.display_name}
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

            <BaseSection heading={{ body: "Your Public Playlists", button: { href: "/music/playlists" } }}>
                <MapPlaylistCards playlists={playlists.items} />
            </BaseSection>
        </Main>
    )
}