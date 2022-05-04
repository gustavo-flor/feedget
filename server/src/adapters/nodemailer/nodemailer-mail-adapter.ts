import { createTransport } from "nodemailer";
import MailAdapter, { SendMailData } from "../mail-adapter";

class NodemailerMailAdapter implements MailAdapter {
    private nodemailer

    constructor() {
        this.nodemailer = createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "cc4f3f5b39e93d",
                pass: "989a8962ba5b24"
            }
        })
    }

    async sendMail({ subject, body }: SendMailData) {
        await this.nodemailer.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Gustavo Flôr <ogustaflor@gmail.com',
            subject,
            html: body
        })
    }
}

export default NodemailerMailAdapter
