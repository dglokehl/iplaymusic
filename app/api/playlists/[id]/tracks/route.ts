import { NextRequest, NextResponse } from "next/server"
import { fetchSpotify } from "@/app/api/fetches"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const searchParams = request.nextUrl.searchParams

    let limit = searchParams.get("limit")
    let offset = searchParams.get("offset")

    const albums = await fetchSpotify(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${offset}`)

    return NextResponse.json(albums)
}