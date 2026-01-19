export function formatSongLength(input: number) {
    const minutes = Math.floor(input / 60);
    const seconds = input - minutes * 60;

    let mm = String(minutes)
    let ss = String(seconds)

    if (seconds < 10) ss = "0" + ss
    // if (minutes < 10) mm = "0" + mm
    return `${mm}:${ss}`
}

export function formatMilliseconds(ms: number) {
    const seconds = Math.floor(ms/1000)
    return formatSongLength(seconds)
}