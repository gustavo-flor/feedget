export interface FeedbackCreateData {
    type: string
    comment: string
    screenshot?: string
}

interface FeedbackRepository {
    create: (data: FeedbackCreateData) => Promise<void>
}

export default FeedbackRepository
