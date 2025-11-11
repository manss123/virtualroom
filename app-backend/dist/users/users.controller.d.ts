import { UsersService } from './users.service';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
    find(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
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
