// src/main.ts
import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications/notifications.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(NotificationsModule);

    // Activamos validación automática para DTOs
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,  // ✅ CAMBIA esto a 'false'
        transform: true,
    }));

    const port = process.env.PORT || 3000;

    // 👇 Necesario para Docker: exponer el servicio a todo el contenedor
    await app.listen(port, '0.0.0.0');

    console.log(`🚀 Notifications service is running on http://localhost:${port}`);
}
bootstrap();