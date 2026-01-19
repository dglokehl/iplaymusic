"use client"

import { usePathname, useRouter } from "next/navigation";

import { IoChevronBackOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";

export default function Header({ title }: { title?: string }) {
    const pathname = usePathname()
    const pathnameArr = pathname.split("/")
    const router = useRouter()

    return (
        <header className="px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-999 pointer-events-none">
            <figure className="size-6 *:size-6 *:hover-75 *:pointer-events-auto">
                {pathnameArr.length > 2 && <IoChevronBackOutline onClick={() => router.back()} />}
            </figure>
            <MdSearch className="size-6 hover-75 pointer-events-auto" />
        </header>
    )
}

// "use client"

// import { usePathname, useRouter } from "next/navigation";

// import { IoChevronBackOutline } from "react-icons/io5";
// import { MdSearch } from "react-icons/md";

// export default function Header({ title }: { title?: string }) {
//     const pathname = usePathname()
//     const pathnameArr = pathname.split("/")
//     const router = useRouter()

//     return (
//         <header className="px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-999 pointer-events-none">
//             <figure className="size-6 *:size-6 *:hover-75 *:pointer-events-auto">
//                 {pathnameArr.length > 2 && <IoChevronBackOutline onClick={() => router.back()} />}
//             </figure>
//             {title &&
//                 <div className="flex-1 flex justify-center items-center">
//                     <h1 className="text-base font-light text-center uppercase text-shadow-md text-shadow-black/35 line-clamp-1 select-none">
//                         {title}
//                     </h1>
//                 </div>
//             }
//             <MdSearch className="size-6 hover-75 pointer-events-auto" />
//         </header>
//     )
// }

// "use client"

// import { usePathname, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// import { IoChevronBackOutline } from "react-icons/io5";
// import { MdSearch } from "react-icons/md";

// export default function Header({ title }: { title?: string }) {
//     const pathname = usePathname()
//     const pathnameArr = pathname.split("/")
//     const router = useRouter()

//     const [pageTitle, setPageTitle] = useState("");
//     const [scrollY, setScrollY] = useState(0);

//     useEffect(() => {
//         setPageTitle(document.title)
//         setScrollY(window.scrollY)

//         const handleScroll = () => {
//             setScrollY(window.scrollY);
//             console.log(window.scrollY)
//         };
//         window.addEventListener("scroll", handleScroll);
//     }, []);

//     const scrollLength = pathnameArr.length > 2 ? 320 : 120

//     return (
//         <header className="px-default h-header flex justify-between items-center gap-4 fixed top-0 inset-x-0 z-999 pointer-events-none">
//             <figure className="size-6 *:size-6 *:hover-75 *:pointer-events-auto">
//                 {pathnameArr.length > 2 && <IoChevronBackOutline onClick={() => router.back()} />}
//             </figure>
//             {pageTitle !== "iPlayMusic" &&
//                 <div className="flex-1 flex justify-center items-center">
//                     <h1 className={`text-base font-light text-center uppercase text-shadow-md text-shadow-black/20 line-clamp-1 select-none duration-200 ${scrollY > scrollLength ? "opacity-100" : "opacity-0"}`}>
//                         {pageTitle.replace("| iPlayMusic", "")}
//                     </h1>
//                 </div>
//             }
//             <MdSearch className="size-6 hover-75 pointer-events-auto" />
//         </header>
//     )
// }