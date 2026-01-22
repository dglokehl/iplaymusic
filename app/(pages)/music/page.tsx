import Wrapper from "@/components/Wrapper"
import SectionWrapper from "@/components/SectionWrapper"
import AlbumCard from "@/components/cards/AlbumCard"
import PlaylistCard from "@/components/cards/PlaylistCard"
import ArtistCard from "@/components/cards/ArtistCard"
import SongCard from "@/components/cards/SongCard"

import { fetchSpotify } from "@/app/api/fetches"

const pageTitle = "Music"
export const metadata = {
    title: pageTitle
}

export default async function MusicLibraryPage() {
    const userAlbums = await fetchSpotify("https://api.spotify.com/v1/me/albums?limit=10")
    const userPlaylists = await fetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10")
    const userArtists = await fetchSpotify("https://api.spotify.com/v1/me/following?type=artist&limit=10")
    const userTracks = await fetchSpotify("https://api.spotify.com/v1/me/tracks?limit=4")
    console.log("userAlbums:", userAlbums.items)
    console.log("userPlaylists:", userPlaylists.items)
    console.log("userArtists:", userArtists.artists.items)
    console.log("userTracks:", userTracks.items)
    
    return (
        <Wrapper className="space-y-6">
            <h2 className="heading-page">Library</h2>
            <SectionWrapper heading={{ body: "Your Playlists", button: { body: "View All", href: "/music/playlists" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {userPlaylists.items.map((item: any, i: number) => <PlaylistCard playlist={item} size="sm" key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "Albums", button: { body: "View All", href: "/music/albums"  } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {userAlbums.items.map((item: any, i: number) => <AlbumCard album={item.album} size="sm" key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "Artists", button: { body: "View All", href: "/music/artists" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {userArtists.artists.items.map((item: any, i: number) => <ArtistCard artist={item} size="sm" key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "Your Liked Songs", button: { body: "View All", href: "/music/songs" } }}>
                <div className="space-y-1">
                    {userTracks.items.map((item: any, i: number) => <SongCard song={item.track} key={i} />)}
                </div>
            </SectionWrapper>
        </Wrapper>
    )
}