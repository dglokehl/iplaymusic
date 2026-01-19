import Wrapper from "@/components/Wrapper"
import SectionWrapper from "@/components/SectionWrapper"
import AlbumCard from "@/components/cards/AlbumCard"
import PlaylistCard from "@/components/cards/PlaylistCard"
import CategoryCard from "@/components/cards/CategoryCard"

import { fetchSpotify } from "@/app/api/fetches"

export default async function HomePage() {
    const newReleases = await fetchSpotify("https://api.spotify.com/v1/browse/new-releases?limit=10")
    // console.log("newReleases:", newReleases.albums.items)
    const userPlaylists = await fetchSpotify("https://api.spotify.com/v1/me/playlists?limit=10")
    // console.log("userPlaylists:", userPlaylists.items)
    const recommended2000s = await fetchSpotify("https://api.spotify.com/v1/search?q=year%3A2000-2009&type=album&limit=10")
    // console.log("recommended2000s:", recommended2000s.albums.items)
    const recommended90s = await fetchSpotify("https://api.spotify.com/v1/search?q=year%3A1990-1999&type=album&limit=10")
    // console.log("recommended90s:", recommended90s.albums.items)
    const categories = await fetchSpotify("https://api.spotify.com/v1/browse/categories?limit=6")
    // console.log("categories:", categories.categories.items)

    return (
        <Wrapper className="space-y-6">
            <h2 className="heading-page">iPlayMusic</h2>
            <SectionWrapper heading={{ body: "Your Playlists", button: { body: "View All", href: "/music/playlists" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {userPlaylists.items.map((item: any, i: number) => <PlaylistCard playlist={item} key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "New Releases", button: { body: "View All" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {newReleases.albums.items.map((item: any, i: number) => <AlbumCard album={item} key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "2000s", button: { body: "View All" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {recommended2000s.albums.items.map((item: any, i: number) => <AlbumCard album={item} key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "90s", button: { body: "View All" } }}>
                <div className="flex overflow-x-scroll scrollbar-hidden">
                    {recommended90s.albums.items.map((item: any, i: number) => <AlbumCard album={item} key={i} />)}
                </div>
            </SectionWrapper>
            <SectionWrapper heading={{ body: "Browse", button: { body: "View All", href: "/music" } }}>
                <div className="grid grid-cols-2 gap-3">
                    {categories.categories.items.map((item: any, i: number) => <CategoryCard category={item} key={i} />)}
                </div>
            </SectionWrapper>
        </Wrapper>
    )
}