import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";
export declare class UsersController {
    private users;
    private prisma;
    constructor(users: UsersService, prisma: PrismaService);
    find(id: string): import("../../generated/prisma/models").Prisma__UserClient<{
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
        pdpaAccepted: boolean;
        pdpaAcceptedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    acceptPdpa(req: any): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            pdpaAccepted: boolean;
            pdpaAcceptedAt: Date | null;
        };
    }>;
}
