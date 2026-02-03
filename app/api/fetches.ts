import { getAccessToken } from "@/utils/cookies"

export async function fetchSpotify(link: string) {
    const accessToken = await getAccessToken()
    if (!accessToken) return

    const res = await fetch(link, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        next: { revalidate: 3600 }
    })
    if (!res.ok) return

    return res.json()
}