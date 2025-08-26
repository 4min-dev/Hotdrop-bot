export default interface ITask {
    type: string,
    img_url: string,
    completed: boolean,
    free_coins_reward: number,
    donation_coins_reward: number,
    data: {
        channel_id: number,
        channel_username: string
    },
    created_at: string,
    currentProgress?: string | number,
    totalProgress?: string | number,
    linkToEvent?: string,
    title: string,
    hint?: string,
    steps: string[],
    backgroundEffect: string
}