import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.access_token,
            ]),
            ignoreExpirations: false,
            secretOrKey: process.env.JWT_ACCESS_SECRET!,
        })
    }

    async validate(payload: { sub: string }) {
        return { userId: payload.sub }
    }
}
