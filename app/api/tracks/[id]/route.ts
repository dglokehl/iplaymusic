import { NextRequest, NextResponse } from "next/server"
import { fetchSpotify } from "@/app/api/fetches"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const track = await fetchSpotify(`https://api.spotify.com/v1/tracks/${id}`)

    return NextResponse.json(track)
}