import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            firstName: string;
            lastName: string;
            sex: string | null;
            age: number | null;
            school: string | null;
            grade: string | null;
            email: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            firstName: string;
            lastName: string;
            sex: string | null;
            age: number | null;
            school: string | null;
            grade: string | null;
            email: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    signTokens(userId: string): {
        accessToken: string;
        refreshToken: string;
    };
}
