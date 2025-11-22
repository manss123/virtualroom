import { Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private users: UsersService, private prisma: PrismaService) {}

  @Get(":id")
  find(@Param("id") id: string) {
    return this.users.getById(id);
  }

  @Post("accept-pdpa")
  async acceptPdpa(@Req() req: any) {
    const userId = req.user.userId as string;
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { pdpaAccepted: true, pdpaAcceptedAt: new Date() },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        pdpaAccepted: true,
        pdpaAcceptedAt: true,
      },
    });
    return { user };
  }
}
