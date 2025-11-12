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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const refresh_guard_1 = require("./refresh.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const swagger_1 = require("@nestjs/swagger");
const isProd = process.env.NODE_ENV === 'production';
const cookieOpts = {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: false,
    path: '/',
};
let AuthController = class AuthController {
    constructor(auth, prisma) {
        this.auth = auth;
        this.prisma = prisma;
    }
    async register(dto, res) {
        const { user, accessToken, refreshToken } = await this.auth.register(dto);
        res.cookie('access_token', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 });
        res.cookie('refresh_token', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return { user };
    }
    async login(dto, res) {
        const { user, accessToken, refreshToken } = await this.auth.login(dto);
        res.cookie('access_token', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 });
        res.cookie('refresh_token', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return { user };
    }
    async logout(res) {
        res.clearCookie('access_token', { path: '/' });
        res.clearCookie('refresh_token', { path: '/' });
        return { ok: true };
    }
    async me(req) {
        const userId = req.user?.userId;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return { user };
    }
    async refresh(req, res) {
        const userId = req.user?.userId;
        const { accessToken, refreshToken } = this.auth.signTokens(userId);
        res.cookie('access_token', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 });
        res.cookie('refresh_token', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return { ok: true };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({ schema: {
            properties: {
                email: { type: 'string', example: 'student@example.com' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['email', 'password']
        } }),
    (0, swagger_1.ApiOkResponse)({ description: 'Set HttpOnly cookies: access_token & refresh_token' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.UseGuards)(refresh_guard_1.RefreshAuthGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map