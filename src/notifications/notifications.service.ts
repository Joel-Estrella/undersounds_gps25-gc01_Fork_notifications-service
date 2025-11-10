import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { MailService } from '../mail/mail.service';


@Injectable()
export class NotificationsService {
    constructor(private readonly prisma: PrismaService, private readonly mailService: MailService) {}

    async create(createNotificationDto: CreateNotificationDto) {
        const notification = await this.prisma.notification.create({
            data: createNotificationDto,
        });

        if (notification.channel === 'email') {
            await this.mailService.sendMail(
                'joelestrellaberrocal@gmail.com',        // esto debe ser un email o mapearlo a uno
                'Nueva notificación',
                notification.message,
            );
        }

        return notification;
    }

    async findAll() {
        return this.prisma.notification.findMany();
    }

    async findOne(id: string) {
        return this.prisma.notification.findUnique({
            where: { id },
        });
    }
    async findByUserId(userId: string) {
        return this.prisma.notification.findMany({
            where: { userId },
        });
    }

    async update(id: string, updateNotificationDto: UpdateNotificationDto) {
        return this.prisma.notification.update({
            where: { id },
            data: updateNotificationDto,
        });
    }

    async findUnreadByUser(userId: string) {
        return this.prisma.notification.findMany({
            where: { userId, read: false },
        });
    }

    async remove(id: string) {
        return this.prisma.notification.delete({
            where: { id },
        });
    }
}
