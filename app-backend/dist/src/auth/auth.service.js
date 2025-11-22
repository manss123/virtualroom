"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const ACCESS_TTL_SEC = 15 * 60;
const REFRESH_TTL_SEC = 7 * 24 * 60 * 60;
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const email = dto.email.toLowerCase();
        const exists = await this.prisma.user.findUnique({ where: { email } });
        if (exists)
            throw new common_1.BadRequestException("Email already in use");
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
        const { accessToken, refreshToken } = this.signTokens(user.id);
        const refreshHash = await bcrypt.hash(refreshToken, 12);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshTokenHash: refreshHash },
        });
        return { user: this.sanitize(user), accessToken, refreshToken };
    }
    async login(dto) {
        const email = dto.email.toLowerCase();
        const identity = await this.prisma.authIdentity.findFirst({
            where: { provider: "local", email },
            include: { user: true },
        });
        if (!identity?.passwordHash)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const ok = await bcrypt.compare(dto.password, identity.passwordHash);
        if (!ok)
            throw new common_1.UnauthorizedException("Invalid credentials");
        const { accessToken, refreshToken } = this.signTokens(identity.userId);
        const refreshHash = await bcrypt.hash(refreshToken, 12);
        await this.prisma.user.update({
            where: { id: identity.userId },
            data: { refreshTokenHash: refreshHash },
        });
        return { user: this.sanitize(identity.user), accessToken, refreshToken };
    }
    signTokens(userId) {
        const accessToken = this.jwt.sign({ sub: userId, type: "access" }, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: "15m" });
        const refreshToken = this.jwt.sign({ sub: userId, type: "refresh" }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: "7d" });
        return { accessToken, refreshToken };
    }
    async rotateRefreshToken(userId, incomingRefresh) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user?.refreshTokenHash)
            throw new common_1.UnauthorizedException("No refresh token on record");
        const valid = await bcrypt.compare(incomingRefresh, user.refreshTokenHash);
        if (!valid)
            throw new common_1.UnauthorizedException("Invalid refresh token");
        const { accessToken, refreshToken } = this.signTokens(userId);
        const refreshHash = await bcrypt.hash(refreshToken, 12);
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshTokenHash: refreshHash },
        });
        return { accessToken, refreshToken };
    }
    sanitize(u) {
        const { refreshTokenHash, ...rest } = u;
        return rest;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map