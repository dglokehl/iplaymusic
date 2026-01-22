"use client"

import Link from "next/link";
import { useState } from "react";
import { IoRadioOutline, IoHeart, IoMusicalNote, IoChevronBack, IoChevronForward } from "react-icons/io5";

type LandingGalleryProps = {
    children?: React.ReactNode;
    className?: string;
}

const galleryArr = [
    {
        heading: "Where Words Fail,\nMusic Speaks",
        body: "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.",
    },
    {
        heading: "No Music\nNo Life",
        body: "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.",
    },
    {
        heading: "Peace, Love\nMusic",
        body: "Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.",
    },
]

export default function LandingGallery({ children, className, ...rest }: LandingGalleryProps) {
    const [index, setIndex] = useState(0);
    const activeStyle = "bg-white fill-[url(#ipm-gradient)] stroke-[url(#ipm-gradient)]"

    return (
        <section className="wrapper-default text-center">
            <h1 className="text-2xl font-bold whitespace-pre-wrap">{galleryArr[index].heading}</h1>
            <p className="mt-3 text-sm font-light">{galleryArr[index].body}</p>

            <div className="mt-10 flex justify-center items-center gap-5 *:p-3 *:size-18 *:border-3 *:border-white *:rounded-full *:hover-scale">
                <IoRadioOutline className={index == 0 ? activeStyle : ""} onClick={() => setIndex(0)} />
                <IoHeart className={index == 1 ? activeStyle : ""} onClick={() => setIndex(1)} />
                <IoMusicalNote className={index == 2 ? activeStyle : ""} onClick={() => setIndex(2)} />
            </div>

            <div className="mt-8 flex justify-between items-center">
                <figure className="size-7 *:size-7 *:hover-scale">
                    {index > 0 && <IoChevronBack onClick={() => setIndex(index - 1)} />}
                </figure>
                <Link href="/login" className="font-light hover-75">SKIP</Link>
                {index < 2 ? (
                    <IoChevronForward className="size-7 hover-scale" onClick={() => setIndex(index + 1)} />
                ) : (
                    <Link href="/login">
                        <IoChevronForward className="size-7 hover-scale" />
                    </Link>
                )}
                
            </div>

            <svg width="0" height="0">
                <linearGradient id="ipm-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#FF6A00" offset="0%" />
                    <stop stopColor="#EE0979" offset="100%" />
                </linearGradient >
            </svg>
        </section>
    )
}