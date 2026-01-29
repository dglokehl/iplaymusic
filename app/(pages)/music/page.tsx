import Main from "@/components/layout/Main"
import BaseSection from "@/components/wrappers/BaseSection"
import { MapAlbumCards, MapPlaylistCards, MapArtistCards } from "@/components/map/MapCards"
import { fetchSpotify } from "@/app/api/fetches"
import TrackList from "@/components/wrappers/TrackList"

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

            <BaseSection heading={{ body: "Your Playlists", button: { href: "/music/playlists" } }}>
                <MapPlaylistCards playlists={userPlaylists.items} size="sm" />
            </BaseSection>

            <BaseSection heading={{ body: "Albums", button: { href: "/music/albums" } }}>
                <MapAlbumCards albums={userAlbums.items} userAlbums size="sm" />
            </BaseSection>

            <BaseSection heading={{ body: "Artists", button: { href: "/music/artists" } }}>
                <MapArtistCards artists={userArtists.artists.items} size="sm" />
            </BaseSection>

            <BaseSection heading={{ body: "Your Liked Songs", button: { href: "/music/songs" } }} customWrapper>
                <TrackList tracks={userTracks.items} />
            </BaseSection>
        </Main>
    )
}