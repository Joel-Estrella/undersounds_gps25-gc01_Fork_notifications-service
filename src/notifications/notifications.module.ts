import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [PrismaModule, MailModule,AuthModule],
    controllers: [NotificationsController],
    providers: [NotificationsService],
})
export class NotificationsModule {}
