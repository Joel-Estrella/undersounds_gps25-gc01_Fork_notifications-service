import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Post()
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.notificationsService.create(createNotificationDto);
    }

    @Get()
    findAll() {
        return this.notificationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.notificationsService.findOne(id);
    }
    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.notificationsService.findByUserId(userId);
    }

    @Get('user/:userId/unread')
    findUnread(@Param('userId') userId: string) {
        return this.notificationsService.findUnreadByUser(userId);
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
        return this.notificationsService.update(id, updateNotificationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.notificationsService.remove(id);
    }
}
