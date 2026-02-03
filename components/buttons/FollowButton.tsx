"use client"

import { useState } from "react"

type FollowButtonProps = {
    followed: boolean;
    className?: string;
}

export default function FollowButton({ followed, className }: FollowButtonProps) {
    const [isFollowing, setIsFollowing] = useState(followed);

    return (
        <button
            className={`py-1 px-2 inline-block text-sm bg-black/20 backdrop-blur-sm border rounded-full shadow-sm hover-scale ${className ? className : ""}`}
            onClick={() => setIsFollowing(!isFollowing)}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    )
}