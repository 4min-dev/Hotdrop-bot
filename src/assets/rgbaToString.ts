export default function rgbaToString(rgbaArray: number[]): string {
    if (rgbaArray.length === 4) {
        const [r, g, b, a] = rgbaArray.map((value) => Math.round(value))
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }
    return 'rgba(0, 0, 0, 1)'
}