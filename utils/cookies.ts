import { cookies } from "next/headers";

export async function getAccessToken() {
    const cookieStore = await cookies()
    if (!cookieStore.has("IPM_AT")) return

    const accessToken = cookieStore.get("IPM_AT")
    if (!accessToken) return

    return accessToken.value
}

export async function getUserId() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("IPM_UID")
    if (!userId) return

    return userId.value
}