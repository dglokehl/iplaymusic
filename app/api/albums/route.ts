import { NextRequest, NextResponse } from "next/server"
import { fetchSpotify } from "../fetches"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    let limit = searchParams.get("limit")
    let offset = searchParams.get("offset")

    const albums = await fetchSpotify(`https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`)

    return NextResponse.json(albums)
}