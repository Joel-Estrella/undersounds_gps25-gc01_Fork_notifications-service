// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications/notifications.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(NotificationsModule);

    // Activamos validación automática para DTOs
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // elimina propiedades no declaradas en DTO
        forbidNonWhitelisted: true, // lanza error si vienen propiedades extra
        transform: true, // transforma tipos automáticamente según DTO
    }));

    const port = 3000;
    await app.listen(port);
    console.log(`🚀 Notifications service is running on http://localhost:${port}`);
}
bootstrap();
