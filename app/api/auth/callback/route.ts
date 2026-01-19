import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"

import { fetchSpotify } from "../../fetches"

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

export async function GET(request: NextRequest) {
    const url = new URL(request.nextUrl)
    const code = url.searchParams.get("code")
    console.log("code:", code)

    const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`
        },
        body: `code=${code}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`
    })

    const data = await res.json()
    console.log(data)

    
    const cookieStore = await cookies()
    cookieStore.set("IPM_AT", data.access_token, { maxAge: data.expires_in })
    cookieStore.set("IPM_RT", data.refresh_token, { maxAge: data.expires_in * 5 })

    const userData = await fetchSpotify("https://api.spotify.com/v1/me")
    cookieStore.set("IPM_UID", userData.id) 

    return NextResponse.redirect(new URL("http://127.0.0.1:3000/"))
}