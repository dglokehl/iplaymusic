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