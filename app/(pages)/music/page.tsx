import Main from "@/components/layout/Main"
import CardSection from "@/components/CardSection"

import { fetchSpotify } from "@/app/api/fetches"

export const metadata = {
    title: "Library"
}

export default async function MusicLibraryPage() {
    const userAlbums = await fetchSpotify("https://api.spotify.com/v1/me/albums?limit=10")
    const userPlaylists = await fetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10")
    const userArtists = await fetchSpotify("https://api.spotify.com/v1/me/following?type=artist&limit=10")
    const userTracks = await fetchSpotify("https://api.spotify.com/v1/me/tracks?limit=4")
    console.log("userAlbums:", userAlbums)
    console.log("userPlaylists:", userPlaylists)
    console.log("userArtists:", userArtists.artists)
    console.log("userTracks:", userTracks)
    
    return (
        <Main>
            <h1 className="heading-page">Library</h1>
            <CardSection
                heading={{ body: "Your Playlists", button: { body: "View All", href: "/music/playlists" } }}
                obj={userPlaylists}
                type="playlists"
                cardSize="sm"
            />
            <CardSection
                heading={{ body: "Albums", button: { body: "View All", href: "/music/albums" } }}
                obj={userAlbums}
                type="userAlbums"
                cardSize="sm"
            />
            <CardSection
                heading={{ body: "Artists", button: { body: "View All", href: "/music/artists" } }}
                obj={userArtists.artists}
                type="artists"
                cardSize="sm"
            />
            <CardSection
                heading={{ body: "Your Liked Songs", button: { body: "View All", href: "/music/songs" } }}
                obj={userTracks}
                type="tracks"
            />
        </Main>
    )
}