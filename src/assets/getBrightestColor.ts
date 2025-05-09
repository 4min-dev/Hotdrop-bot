import rgbaToString from "./rgbaToString"
import saturateColor from "./saturateColor"

export default function getBrightestColor(rgbaArray: number[]): string {
    const saturatedColor = saturateColor(rgbaArray, 2.5)
    return rgbaToString(saturatedColor)
}