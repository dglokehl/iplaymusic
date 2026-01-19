import Wrapper from "@/components/Wrapper"
import SectionWrapper from "@/components/SectionWrapper"
import CategoryCard from "@/components/cards/CategoryCard"

import { fetchSpotify } from "@/app/api/fetches"

const pageTitle = "Browse"
export const metadata = {
    title: pageTitle
}

export default async function BrowsePage() {
    const categories = await fetchSpotify("https://api.spotify.com/v1/browse/categories")
    console.log(categories.categories)

    return (
        <Wrapper title={pageTitle} className="space-y-6">
            <h2 className="heading-page">Browse</h2>
            <SectionWrapper heading={{ body: "Categories" }}>
                <div className="grid grid-cols-2 gap-3">
                    {categories.categories.items.map((item: any, i: number) => <CategoryCard category={item} key={i} />)}
                </div>
            </SectionWrapper>
        </Wrapper>
    )
}