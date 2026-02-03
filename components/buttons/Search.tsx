"use client"

import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { IoChevronUp } from "react-icons/io5";
import SearchFormWrapper from "../wrappers/SearchFormWrapper";

export default function Search() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <figure className="size-6 *:size-6 hover-75 pointer-events-auto" onClick={() => setOpen(!open)}>
                {!open ? <MdSearch /> : <IoChevronUp />}
            </figure>
            {open && (
                <SearchFormWrapper className="justify-self-center px-default max-w-lg w-full fixed top-header inset-x-0 z-999 pointer-events-auto">
                    <div className="relative">
                        <button className="*:size-6 absolute right-3 top-1/2 -translate-y-1/2 text-black hover-75" type="submit">
                            <MdSearch />
                        </button>
                        <input type="search" name="q" id="q" className="px-4 pr-10 w-full h-10 block text-sm text-black bg-white rounded-full focus:outline-0 shadow-lg" autoFocus />
                    </div>
                </SearchFormWrapper>
            )}
        </>
    )
}