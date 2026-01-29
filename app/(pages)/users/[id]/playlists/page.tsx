import { fetchSpotify } from "@/app/api/fetches";
import Main from "@/components/layout/Main";
import ReleaseListItems from "@/components/wrappers/ReleaseListItems"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

	const user = await fetchSpotify(`https://api.spotify.com/v1/users/${id}`);

	return {
		title: `Playlists · ${user.display_name}`
	}
}

export default async function UserPlaylistsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const limit = 48
    const route = `users/${id}/playlists`

    const user = await fetchSpotify(`https://api.spotify.com/v1/users/${id}`);
    const playlists = await fetchSpotify(`https://api.spotify.com/v1/${route}?limit=${limit}&offset=0`)
    console.log("playlists:", playlists)

    return (
        <Main>
            <h1 className="heading-page">{user.display_name}'s Playlists</h1>
            <ReleaseListItems
                initFetch={playlists}
                route={route}
                type="playlist"
            />
        </Main>
    )
}