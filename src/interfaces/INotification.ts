export default interface INotification {
    id: string,
    type: 'system' | 'private' | 'important',
    title: string,
    description: string,
    created_at: Date,
    isRead?: boolean
}