import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(id: string): import("../../generated/prisma/models").Prisma__UserClient<{
        firstName: string;
        lastName: string;
        sex: string | null;
        age: number | null;
        school: string | null;
        grade: string | null;
        email: string | null;
        id: string;
        refreshTokenHash: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
