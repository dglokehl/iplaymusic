import Main from "@/components/layout/Main"
import CategoryCard from "@/components/cards/CategoryCard"

import { fetchSpotify } from "@/app/api/fetches"

export const metadata = {
    title: "Browse"
}

export default async function BrowsePage() {
    const categories = await fetchSpotify("https://api.spotify.com/v1/browse/categories")
    // console.log("categories:", categories.categories)

    return (
        <Main>
            <h1 className="heading-page">Browse</h1>
            <div className="space-y-2">
                <h2 className="text-lg font-bold">Categories</h2>
                <div className="card-grid gap-3">
                    {categories.categories.items.map((item: any, i: number) => <CategoryCard category={item} key={i} />)}
                </div>
            </div>
        </Main>
    )
}