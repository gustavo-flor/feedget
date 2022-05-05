import MailAdapter from "../adapters/mail-adapter";
import FeedbackRepository from "../repositories/feedback-repository"

interface SubmitFeedbackUseCaseData {
    type: string
    comment: string
    screenshot?: string
}

class SubmitFeedbackUseCase {
    private feedbackRepository;
    private mailAdapter

    constructor(feedbackRepository: FeedbackRepository, mailAdapter: MailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter
    }

    async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseData) {
        await this.feedbackRepository.create({ 
            type, 
            comment, 
            screenshot 
        })
        if (!type) {
            throw new Error('Type is required.')
        }
        if (!comment) {
            throw new Error('Comment is required.')
        }
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        const image = screenshot 
            ? `<img src="${screenshot}" />`
            : ''
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback!',
            body: [
                `<div style="font-family: sans-serif; font-size: 1rem; color: #111;">`,
                `   <p>Tipo: ${type}</p>`,
                `   <p>Comentário: ${comment}</p>`,
                `   ${image}`,
                `<div>`
            ].join('\n')
        })
    }
}

export default SubmitFeedbackUseCase
