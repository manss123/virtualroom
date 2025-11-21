import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshAuthGuard } from './refresh.guard'
import { PrismaService } from '../prisma/prisma.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

const isProd = process.env.NODE_ENV === 'production'
const cookieOpts = {
    httpOnly: true,
    sameSite: isProd ? ('none' as const) : ('lax' as const),
    secure: false,
    path: '/',
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService, private prisma: PrismaService) {}

    @Post('register')
    @ApiBody({ schema: {
        properties: {
            email: { type: 'string', example: 'student@example.com' },
            password: { type: 'string', example: 'password123' },
            firstname: { type: 'string', example: 'John'},
            lastName: { type: 'string', example: 'Dohn'},
            sex: { type: 'string', example: 'Male'},
            age: { type: 'number', example: 15},
            school: { type: 'string', example: 'โรงเรียน'},
            grade: { type: 'string', example: 'มัธยมศึกษาปีที่ 3'},
        },
        required: ['email','password']
    }})
    async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        const { user, accessToken, refreshToken } = await this.auth.register(dto);
        res.cookie('access_token', accessToken, {...cookieOpts, maxAge: 15 * 60 * 1000 })
        res.cookie('refresh_token', refreshToken, {...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return { user }
    }

    @Post('login')
    @ApiBody({ schema: {
        properties: {
            email: { type: 'string', example: 'student@example.com' },
            password: { type: 'string', example: 'password123' },
        },
        required: ['email','password']
    }})
    @ApiOkResponse({ description: 'Set HttpOnly cookies: access_token & refresh_token' })
    async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
        const { user, accessToken, refreshToken } = await this.auth.login(dto);
        res.cookie('access_token', accessToken, {...cookieOpts, maxAge: 15 * 60 * 1000})
        res.cookie('refresh_token', refreshToken, {...cookieOpts, maxAge: 7 * 24 * 60 * 60 *1000 })
        return { user }
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('access_token', { path: '/' })
        res.clearCookie('refresh_token', { path: '/' })
        return { ok: true }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Req() req: Request) {
        const userId = (req.user as any)?.userId as string
        const user = await this.prisma.user.findUnique({ where: { id: userId } })
        return { user }
    }

    @UseGuards(RefreshAuthGuard)
    @Post('refresh')
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const userId = (req.user as any)?.userId as string
        const { accessToken, refreshToken } = this.auth.signTokens(userId)

        res.cookie('access_token', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 })
        res.cookie('refresh_token', refreshToken, { ...cookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000})
        return { ok: true }
    }
}
