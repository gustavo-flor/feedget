import { createTransport } from "nodemailer";
import MailAdapter, { SendMailData } from "../mail-adapter";

class NodemailerMailAdapter implements MailAdapter {
    private nodemailer

    constructor() {
        this.nodemailer = createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "",
                pass: ""
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
