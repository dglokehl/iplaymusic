import Wrapper from "@/components/Wrapper"
import { fetchSpotify } from "@/app/api/fetches"

const pageTitle = "User"
export const metadata = {
    title: pageTitle
}

export default async function UserPage() {
    const userData = await fetchSpotify("https://api.spotify.com/v1/me")
    console.log(userData)

    return (
        <Wrapper title={pageTitle}>
            <h2>user page</h2>
        </Wrapper>
    )
}