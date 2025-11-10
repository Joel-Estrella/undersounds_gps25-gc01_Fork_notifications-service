import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // o 'hotmail' o SMTP personalizado
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }

    async sendMail(to: string, subject: string, text: string) {
        return this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
        });
    }
}
