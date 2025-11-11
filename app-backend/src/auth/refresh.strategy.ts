import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from 'passport-jwt'
import { Request } from "express";

function cookieExtractionFactory(name: string) {
    return (req: Request) => req?.cookies?.[name] || null
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractionFactory('refresh_token')]),
            ignoreExpirations: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET!,
        })
    }

    async validate(payload: { sub: string }) {
        return { userId: payload.sub }
    }
}
