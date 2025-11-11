import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { RefreshJwtStrategy } from "./refresh.strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RefreshJwtStrategy, JwtService],
    exports: [AuthService, JwtService],
})

export class AuthModule {}
