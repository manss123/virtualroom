import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => req?.cookies?.['refresh_token'],
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      ignoreExpiration: false,
    })
  }
  async validate(payload: { sub: string }) {
    return { userId: payload.sub }
  }
}
