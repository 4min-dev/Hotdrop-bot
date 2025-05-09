export default function saturateColor(rgbaArray: number[], saturationFactor: number = 1.5): number[] {
    if (rgbaArray.length === 4) {
        const [r, g, b] = rgbaArray.slice(0, 3).map((value) => Math.round(value))
        const max = Math.max(r + 20, g + 20, b + 20)
        const min = Math.min(r + 20, g + 20, b + 20)

        if (max === min) return [r, g, b, rgbaArray[3]]

        const delta = max - min
        const newDelta = Math.min(delta * saturationFactor, 255)

        const scale = (value: number) => {
            if (value === max) return value + (newDelta - delta)
            if (value === min) return value - (newDelta - delta)
            return value
        }

        return [scale(r), scale(g), scale(b), rgbaArray[3]]
    }
    return [0, 0, 0, rgbaArray[3]]
}