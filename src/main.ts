import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("/api")
    app.enableCors({
        origin: 'http://localhost:3001',
        credentials: true,
    });
    const config = new DocumentBuilder()
        .setTitle('Sharm Beauty API')
        .setDescription('API for Sharm Beauty')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('documents', app, document);

    await app.listen(3000);
}

bootstrap();
