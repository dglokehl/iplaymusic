export async function fetchServer(route: string, limit: number, offset: number, after?: string | null) {
    let url = `http://127.0.0.1:3000/api/${route}?limit=${limit}&offset=${offset}`
    if (after) url = `http://127.0.0.1:3000/api/${route}?limit=${limit}&after=${after}`

    const res = await fetch(url)
    return res.json()
}