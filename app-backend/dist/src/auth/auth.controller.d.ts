import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthController {
    private auth;
    private prisma;
    constructor(auth: AuthService, prisma: PrismaService);
    register(dto: RegisterDto, res: Response): Promise<{
        user: any;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        user: any;
    }>;
    logout(res: Response): Promise<{
        ok: boolean;
    }>;
    me(req: Request): Promise<{
        user: {
            id: string;
            email: string | null;
            firstName: string;
            lastName: string;
            sex: string | null;
            age: number | null;
            school: string | null;
            grade: string | null;
            refreshTokenHash: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }>;
    refresh(req: Request, res: Response): Promise<{
        ok: boolean;
    }>;
}
