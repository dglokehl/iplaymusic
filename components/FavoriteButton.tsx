"use client"

import { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

type FavoriteButtonProps = {
    isFavorite: boolean;
    className?: string;
}

export default function FavoriteButton({ isFavorite, className }: FavoriteButtonProps) {
    const [buttonFill, setButtonFill] = useState(isFavorite)
    // console.log(isFavorite, buttonFill)

    const buttonStyle = `size-6 hover-75 fill-[url(#ipm-gradient)] ${className ? className : ""}`

    return (
        <>
            {buttonFill ? <IoMdHeart className={buttonStyle} onClick={() => setButtonFill(!buttonFill)} />
                : <IoMdHeartEmpty className={buttonStyle} onClick={() => setButtonFill(!buttonFill)} /> }

            <svg width="0" height="0">
                <linearGradient id="ipm-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor="#FF6A00" offset="0%" />
                    <stop stopColor="#EE0979" offset="100%" />
                </linearGradient >
            </svg>
        </>
    )
}