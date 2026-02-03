import { getCoverImage } from "@/utils/helpers";
import Image from "next/image"

export type DefaultImageProps = {
    url: string;
    alt: string;
    width?: number | null;
    height?: number | null;
}[]

type CoverImageProps = {
    images: DefaultImageProps;
    alt: string;
    className?: string;
}

export default function CoverImage({ images, alt, className }: CoverImageProps) {
    const img = getCoverImage(images)

    return (
        <Image
            src={img.url}
            alt={alt}
            width={img.width}
            height={img.height}
            className={`object-cover ${className ? className : ""}`}
        />
    )
}