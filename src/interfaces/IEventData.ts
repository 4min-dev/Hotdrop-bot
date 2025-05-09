import IEtap from "./IEtap";

export default interface IEventsData {
    id: number,
    img: string,
    tokenPreview: string,
    title: string,
    award: number,
    isCompleted: boolean,
    currentProgress?: number,
    totalProgress?: number,
    backgroundEffect?: string,
    reward: number,
    linkToEvent: string,
    hint: string,
    etaps: IEtap[]
}