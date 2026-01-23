import Main from "@/components/layout/Main"
import CardSection from "@/components/CardSection"

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
            <CardSection
                heading={{ body: "Your Playlists", button: { body: "View All", href: "/music/playlists" } }}
                obj={userPlaylists}
                type="playlists"
            />
            <CardSection
                heading={{ body: "New Releases", button: { body: "View All", href: "/search?q=tag:new&type=album" } }}
                obj={newReleases.albums}
                type="albums"
            />
            <CardSection
                heading={{ body: "2000s", button: { body: "View All", href: "/search?q=year:2000-2009&type=album" } }}
                obj={recommended2000s.albums}
                type="albums"
            />
            <CardSection
                heading={{ body: "90s", button: { body: "View All", href: "/search?q=year:1990-1999&type=album" } }}
                obj={recommended90s.albums}
                type="albums"
            />
        </Main>
    )
}