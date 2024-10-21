import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { user } from '@prisma/client';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    constructor(private readonly config: ConfigService) {
      this.transporter = nodemailer.createTransport({
        host: this.config.get('SMTP_HOST'),
        port: Number(this.config.get('SMTP_PORT')),
        secure: process.env.MAILER_SECURE === 'false',
        auth: {
          user: this.config.get('SMTP_EMAIL'),
          pass: this.config.get('SMTP_PASSWORD'),
        },
      });
    }
  
    async sendUserConfirmation(user: user, token: string) {
      const url = `${this.config.get('SERVER_URL')}/validate/${token}`;
      const emailHtml = `<p>Bonjour ${user.pseudo},</p>
          <p>ta prochaine etape serra de valider ton compte en cliquant sur le lien suivant :</p>
              <a href='${url}'>Clique ici pour valider ton compte</a>
          <p>apres validation tu pourra te connecter à notre plateforme ! </p>`;
  
      await this.transporter.sendMail({
        from: this.config.get('SMTP_EMAIL'),
        to: user.email,
        subject: 'Bienvenue sur Interest',
        html: emailHtml,
      });
    }
}