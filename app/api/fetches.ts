import { cookies } from "next/headers"

export async function fetchSpotify(link: string) {
    const cookieStore = await cookies()
    if (!cookieStore.has("IPM_AT")) return

    const accessToken = cookieStore.get("IPM_AT")
    if (!accessToken) return

    const res = await fetch(link, {
        headers: {
            Authorization: `Bearer ${accessToken.value}`
        },
        next: { revalidate: 3600 }
    })

    return res.json()
}