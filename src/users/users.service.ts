import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';
import { SingUpDto } from './dtos/singUp.dto';
import { SingInDto } from './dtos/singIn.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') 
    private readonly userModel: Model<User>, private readonly authService: AuthService
  ) {}

  public async singUp(data: SingUpDto): Promise<User>{
    const user = new this.userModel(data)
    return user.save()
  }

  public async singIn(data: SingInDto): Promise<{name: string, jwtToken: string, email: string}>{
    const user = await this.findByEmail(data.email)
    const match = await this.checkPassword(data.password,user)
    
    if(!match){
      throw new UnauthorizedException("User not Found!")
    }

    const jwt = await this.authService.createAccessToken(user._id)

    return {
      name: user.name, 
      jwtToken: jwt,
      email: user.email
    }

  }

  public async findAll(){
    return await this.userModel.find()
  }

  private async findByEmail(email: string): Promise<User>{
    const user = await this.userModel.findOne({email})

    if(!user){
      throw new NotFoundException("User not Found!")
    }

    return user
  }

  private async checkPassword(password: string, user: User): Promise<boolean>{
    const match = await bcrypt.compare(password, user.password)

    if(!match){
      throw new UnauthorizedException("User not Found!")
    }

    return match
  }
}
