import express from 'express'
import NodemailerMailAdapter from './adapters/nodemailer/nodemailer-mail-adapter'

import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedback-repository'
import SubmitFeedbackUseCase from './use-cases/submit-feedback-use-case'

const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    const feedbackRepository = new PrismaFeedbackRepository()
    const mailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(feedbackRepository, mailAdapter)
    await submitFeedbackUseCase.execute({ type, comment, screenshot })
    return res.status(201).send()
})

export default routes
