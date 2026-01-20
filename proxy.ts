import { cookies } from "next/headers";

import { NextResponse, NextRequest } from "next/server";


export async function proxy(request: NextRequest) {
    // console.log(request)
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("IPM_AT")
    if (!accessToken) return NextResponse.redirect(new URL("/landing", request.url))
}

export const config = {
    matcher: ["/", "/browse", "/music/:path*", "/user/:path*"]
}