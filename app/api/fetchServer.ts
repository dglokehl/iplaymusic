export async function fetchServer(route: string, limit: number, offset: number) {
    const res = await fetch(`http://127.0.0.1:3000/api/${route}?limit=${limit}&offset=${offset}`)

    return res.json()
}