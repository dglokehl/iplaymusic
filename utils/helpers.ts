import type { CardSize } from "@/components/cards/Card"

export function formatLength(input: number, format?: "short") {
    const hours = Math.floor(input / 60 / 60)
    const minutes = Math.floor(input / 60) - (hours * 60)
    const seconds = input % 60
    let hh = String(hours)
    let mm = String(minutes)
    let ss = String(seconds)

    if (seconds < 10) ss = "0" + ss

    if (hours > 0) {
        if (minutes < 10) mm = `0${minutes}`
        if (format === "short") {
            if (seconds == 0) return `${hh} hr ${mm} min`
            return `${hh} hr ${mm} min ${ss} sec`
        }
        return `${hh}:${mm}:${seconds}`
    }

    if (format === "short") {
        if (seconds == 0) return `${mm} min`
        return `${mm} min ${ss} sec`
    }
    return `${mm}:${ss}`
}

export function formatMilliseconds(ms: number, format?: "short") {
    const seconds = Math.floor(ms/1000)
    return formatLength(seconds, format)
}

export function getTotalLength(tracks: any[]) {
    let total = 0
    tracks.forEach(track => {
        if (track.duration_ms) {
            total += track.duration_ms
        } else {
            total += track.track.duration_ms
        }
    });
    return formatMilliseconds(total, "short")
}


export function formatReleaseDate(yeardate: string, format?: "year" | "short") {
    const date = new Date(yeardate)
    const dateFormatted = new Intl.DateTimeFormat("en-DK", { day: "2-digit", month: format === "short" ? "short" : "long", year: "numeric" }).format(date);
    console.log(dateFormatted)
    if (format === "year") return yeardate.slice(0, 4)
    return dateFormatted
}


export function getCoverImage(images: any[], size?: CardSize) {
    if (!images || images.length < 1) {
        return {
            url: size === "xs" ? "/placeholder-xs.png" : "/placeholder.png",
            width: size === "xs" ? 64 : 300,
            height: size === "xs" ? 64 : 300,
        }
    }

    let coverMin = 200
    let coverMax = 400

    if (size === "xs") {
        coverMin = 10
        coverMax = 200
    }

    let coverImage = images.filter((image: any) => image.width > coverMin && image.width < coverMax)
    if (coverImage.length < 1) {
        if (!images[0].width) images[0].width = 300
        if (!images[0].height) images[0].height = 300
        return images[0]
    }
    // console.log(coverImage[0])

    if (!coverImage[0].width) coverImage[0].width = 300
    if (!coverImage[0].height) coverImage[0].height = 300
    return coverImage[0]
}