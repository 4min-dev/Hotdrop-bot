export default interface IGameActivity {
    success: boolean,
    catching: {
        record: number,
        last_activity: string | null
    },
    clicker: {
        record: number,
        last_activity: string | null
    },
    craft: {
        record: number,
        last_activity: string | null,
        img_url: string | null,
        title: string | null
    },
}