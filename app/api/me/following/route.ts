import { NextRequest, NextResponse } from "next/server"
import { fetchSpotify } from "../../fetches"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    let limit = searchParams.get("limit")
    let after = searchParams.get("after")

    const artists = await fetchSpotify(`https://api.spotify.com/v1/me/following?type=artist&limit=${limit}&after=${after}`)

    return NextResponse.json(artists.artists)
}