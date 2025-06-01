import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from "@prisma/client";

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(user:User){
        const url = `${process.env.API_HOST}/api/user-auth/activate/${user.activation_link}`
        
        await this.mailerService.sendMail({
            to:user.email,
            subject:"Welcome to Vidora App!",
            html:`<h1>Hello! Dear ${user.fullname},</h1>
<h2>Please click below to confirmation</h2>
<p>
    <a href="${url}">Confirm</a>
</p>`,
        })
    }
}
