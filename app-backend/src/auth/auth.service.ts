import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async register(dto: RegisterDto) {
        const email = dto.email.toLowerCase()
        const exists = await this.prisma.user.findUnique({where: { email }})
        if(exists) throw new BadRequestException('Email already in use');
        
        const passwordHash = await bcrypt.hash(dto.password, 12)
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
                        provider: 'local',
                        email,
                        passwordHash,
                    }
                },
            },
        })

        const tokens = this.signTokens(user.id)
        return { user, ...tokens }
    }

    async login(dto: LoginDto) {
        const email = dto.email.toLowerCase()
        const identity = await this.prisma.authIdentity.findFirst({
            where: { provider: 'local', email },
            include: { user: true },
        })
        if(!identity?.passwordHash) throw new UnauthorizedException('Invalid credentials');

        const ok = await bcrypt.compare(dto.password, identity.passwordHash)
        if(!ok) throw new UnauthorizedException('Invalid credentials');

        const tokens = this.signTokens(identity.userId)
        return { user: identity.user, ...tokens }
    }

    signTokens(userId: string) {
        const accessToken = this.jwt.sign(
            { sub: userId, type: 'access' },
            { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: '15m' },
        )

        const refreshToken = this.jwt.sign(
            { sub: userId, type: 'refresh' },
            { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: '7d' },
        )

        return { accessToken, refreshToken }
    }
}
