import Wrapper from "@/components/Wrapper"
import { fetchSpotify } from "@/app/api/fetches"

export const metadata = {
    title: "User Settings"
}

export default async function UserPage() {
    const userData = await fetchSpotify("https://api.spotify.com/v1/me")
    console.log(userData)

    return (
        <Wrapper title={metadata.title}>
            <h2>user page</h2>
        </Wrapper>
    )
}