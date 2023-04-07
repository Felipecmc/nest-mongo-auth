import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from '../users/models/user.model';
import { JwtPayload } from './models/jwtPayload.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User")
        private readonly userModel: Model<User> 
    ) {
    }

    public async createAccessToken(userId: string): Promise<string> {
        return sign({ userId: userId }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_DURATION,
        });
    }

    public async ValidateUser(jwtPayload: JwtPayload): Promise<User>{
        const user = await this.userModel.findOne({_id : jwtPayload.userId})
        if(!user){
            throw new UnauthorizedException("User not Found")
        }

        return user
    }

    private jwtExtractor(req: Request): string{
        const authHeader = req.headers.authorization

        if(!authHeader){
            throw new BadRequestException("Bad Request.")
        }

        const [, token] = authHeader.split(' ')

        return token
    }

    public returnJwtextractor(req: Request): string{
        return this.jwtExtractor(req)
    }
}
