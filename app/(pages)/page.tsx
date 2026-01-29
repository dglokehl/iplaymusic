import Main from "@/components/layout/Main"
import BaseSection from "@/components/wrappers/BaseSection"
import { MapAlbumCards, MapPlaylistCards } from "@/components/map/MapCards"

import { fetchSpotify } from "@/app/api/fetches"

export default async function HomePage() {
    const userPlaylists = await fetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10")
    console.log("userPlaylists:", userPlaylists)
    const newReleases = await fetchSpotify("https://api.spotify.com/v1/search?q=tag:new&type=album&limit=10")
    console.log("newReleases:", newReleases.albums)
    const recommended2000s = await fetchSpotify("https://api.spotify.com/v1/search?q=year:2000-2009&type=album&limit=10")
    console.log("recommended2000s:", recommended2000s.albums)
    const recommended90s = await fetchSpotify("https://api.spotify.com/v1/search?q=year:1990-1999&type=album&limit=10")
    console.log("recommended90s:", recommended90s.albums)

    return (
        <Main>
            <h1 className="heading-page">iPlayMusic</h1>

            <BaseSection heading={{ body: "Your Playlists", button: { href: "/music/playlists" } }}>
                <MapPlaylistCards playlists={userPlaylists.items} />
            </BaseSection>

            <BaseSection heading={{ body: "New Releases", button: { href: "/search?q=tag:new&type=album" } }}>
                <MapAlbumCards albums={newReleases.albums.items} />
            </BaseSection>

            <BaseSection heading={{ body: "2000s", button: { href: "/search?q=year:2000-2009&type=album" } }}>
                <MapAlbumCards albums={recommended2000s.albums.items} />
            </BaseSection>

            <BaseSection heading={{ body: "90s", button: { href: "/search?q=year:1990-1999&type=album" } }}>
                <MapAlbumCards albums={recommended90s.albums.items} />
            </BaseSection>
        </Main>
    )
}