import { NextRequest, NextResponse } from "next/server"
import { fetchSpotify } from "@/app/api/fetches"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    let time_range = searchParams.get("time_range")

    const userTop = await fetchSpotify(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=10`)
    console.log(userTop)

    return NextResponse.json(userTop)
}