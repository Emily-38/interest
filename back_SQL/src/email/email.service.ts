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
  
    async sendForgetPassword(user: user, token: string) {
      const url = `${this.config.get('SERVER_URL')}/change_password/${token}`;
      const emailHtml = `<p>Bonjour ${user.pseudo},</p>
          <p>Vous avez fait une demande de changement de mots de passe voici le lien qui vous permettra de changer de mots de passe:</p>
              <a href='${url}'>Clique ici pour changer de mots de passe</a>`;
  
      await this.transporter.sendMail({
        from: this.config.get('SMTP_EMAIL'),
        to: user.email,
        subject: 'Vous avez fait une demande de changement de mot de passe ? ',
        html: emailHtml,
      });
    }

    async sendUserConfirmation (user: user, token: string) {
        const url = `${this.config.get('SERVER_URL')}/validate/${token}`;
        const emailHtml = `<p>Bonjour ${user.pseudo},</p>
            <p>Ta prochaine étape sera de valider ton compte en cliquant sur le lien suivant :</p>
                <a href='${url}'>Clique ici pour valider ton compte</a>
            <p>Après cette étape, tu pourras à nouveau te connecter à notre plateforme ! </p>`;
    
        await this.transporter.sendMail({
          from: this.config.get('SMTP_EMAIL'),
          to: user.email,
          subject: 'Bienvenue sur Interest',
          html: emailHtml,
        });
      }
}