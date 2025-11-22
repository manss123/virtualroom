import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { QuestionnaireType } from "../../generated/prisma/client";

const ACCESS_TTL_SEC = 15 * 60;
const REFRESH_TTL_SEC = 7 * 24 * 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) throw new BadRequestException("Email already in use");

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        sex: dto.sex,
        age: dto.age,
        school: dto.school,
        grade: dto.grade,
        email,
        identities: {
          create: {
            provider: "local",
            email,
            passwordHash,
          },
        },
      },
    });

    await this.prisma.questionnaireStatus.createMany({
      data: [
        QuestionnaireType.PDPA_CONSENT,
        QuestionnaireType.PRE_TEST,
        QuestionnaireType.PRE_SURVEY,
        QuestionnaireType.POST_TEST,
        QuestionnaireType.POST_SURVEY,
      ].map((type) => ({ userId: user.id, type })),
      skipDuplicates: true,
    });

    const { accessToken, refreshToken } = this.signTokens(user.id);
    const refreshHash = await bcrypt.hash(refreshToken, 12);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshTokenHash: refreshHash },
    });

    return { user: this.sanitize(user), accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase();
    const identity = await this.prisma.authIdentity.findFirst({
      where: { provider: "local", email },
      include: { user: true },
    });
    if (!identity?.passwordHash)
      throw new UnauthorizedException("Invalid credentials");

    const ok = await bcrypt.compare(dto.password, identity.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    const { accessToken, refreshToken } = this.signTokens(identity.userId);

    // บันทึก hash ของ refresh token ล่าสุดไว้ที่ User
    const refreshHash = await bcrypt.hash(refreshToken, 12);
    await this.prisma.user.update({
      where: { id: identity.userId },
      data: { refreshTokenHash: refreshHash },
    });

    return { user: this.sanitize(identity.user), accessToken, refreshToken };
  }

  signTokens(userId: string) {
    const accessToken = this.jwt.sign(
      { sub: userId, type: "access" },
      { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: "15m" }
    );

    const refreshToken = this.jwt.sign(
      { sub: userId, type: "refresh" },
      { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }

  async rotateRefreshToken(userId: string, incomingRefresh: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user?.refreshTokenHash)
      throw new UnauthorizedException("No refresh token on record");

    const valid = await bcrypt.compare(incomingRefresh, user.refreshTokenHash);
    if (!valid) throw new UnauthorizedException("Invalid refresh token");

    const { accessToken, refreshToken } = this.signTokens(userId);
    const refreshHash = await bcrypt.hash(refreshToken, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: refreshHash },
    });
    return { accessToken, refreshToken };
  }

  sanitize(u: any) {
    const { refreshTokenHash, ...rest } = u;
    return rest;
  }
}
