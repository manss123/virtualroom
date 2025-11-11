"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credential: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('VR Learning API')
        .setDescription('API for auth, tests, and learning log')
        .setVersion('1.0.0')
        .addCookieAuth('access_token', {
        type: 'apiKey',
        in: 'cookie',
        description: 'HttpOnly cookie set by server'
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    await app.listen(process.env.PORT ? Number(process.env.PORT) : 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map