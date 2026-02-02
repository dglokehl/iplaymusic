import { fetchSpotify } from "@/app/api/fetches";
import Main from "@/components/layout/Main"
import SearchResults from "./_components/SearchResults";
import SearchFormWrapper from "@/components/wrappers/SearchFormWrapper";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;

    return {
        title: q
    }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const { q } = await searchParams;
    // console.log("q:", q)

    const results = await fetchSpotify(`https://api.spotify.com/v1/search?q=${q}&type=album,playlist,artist,track`)
    // console.log("results:", results)

    return (
        <Main>
            <SearchFormWrapper className="space-y-2">
                <h1 className="text-xl font-bold">Showing results for:</h1>
                <input type="search" name="q" id="q" defaultValue={q} className="px-4 pr-10 w-full h-10 block text-sm text-black bg-white rounded-full focus:outline-0 shadow-lg" />
            </SearchFormWrapper>

            {results && <SearchResults results={results} />}
        </Main>
    )
}