import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
