import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"
import { AuthService } from "../auth.service";
import { JwtPayload } from "../models/jwtPayload.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly authService: AuthService
    ){
        super({
            jwtFromRequest: authService.returnJwtextractor,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(jwtPayload: JwtPayload){
        const user = this.authService.ValidateUser(jwtPayload)

        if(!user){
            throw new UnauthorizedException("User not Found")
        }

        return user
    }
}