import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
    }>;
    signTokens(userId: string): {
        accessToken: string;
        refreshToken: string;
    };
    rotateRefreshToken(userId: string, incomingRefresh: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    sanitize(u: any): any;
}
