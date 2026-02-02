import { redirect } from "next/navigation";
import { fetchSpotify } from "@/app/api/fetches";
import { getUserId } from "@/utils/cookies";
import { getCoverImage } from "@/utils/helpers";
import { MapPlaylistCards } from "@/components/map/MapCards"
import Main from "@/components/layout/Main";
import BaseSection from "@/components/wrappers/BaseSection"
import FollowButton from "@/components/buttons/FollowButton";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

	const user = await fetchSpotify(`https://api.spotify.com/v1/users/${id}`);

	return {
		title: user.display_name
	}
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const userId = await getUserId()
    if (id === userId) redirect("/profile")

    const user = await fetchSpotify(`https://api.spotify.com/v1/users/${id}`)
    // console.log("user:", user)
    const playlists = await fetchSpotify(`https://api.spotify.com/v1/users/${id}/playlists?limit=10`)
    // console.log("playlists:", playlists)

    const isFollowing = await fetchSpotify(`https://api.spotify.com/v1/me/following/contains?type=user&ids=${id}`)
    // console.log("isFollowing", isFollowing)

    return (
        <Main>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img
                        src={getCoverImage(user.images).url}
                        alt={user.display_name}
                        className="size-24 rounded-full shrink-0"
                    />
                    <div>
                        <h1 className="heading-page text-lg leading-5">{user.display_name}</h1>
                        <p className="text-xs">{user.followers.total} followers</p>
                    </div>
                </div>
                <FollowButton followed={isFollowing[0]} className="shrink-0" />
            </div>

            <BaseSection heading={{ body: "Public Playlists", button: { href: `/users/${id}/playlists` } }}>
                <MapPlaylistCards playlists={playlists.items} />
            </BaseSection>
        </Main>
    )
}