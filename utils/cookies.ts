import { cookies } from "next/headers";

export async function getUserId() {
    const cookieStore = await cookies()
    const userId = cookieStore.get("IPM_UID")
    if (!userId) return

    return userId.value
}