import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { SingUpDto } from './dtos/singUp.dto';
import { User } from './models/user.model';
import { SingInDto } from './dtos/singIn.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService){}

    @Post("singup")
    @HttpCode(HttpStatus.CREATED)
    public async singUp(@Body() data: SingUpDto): Promise<User> {
        return await this.userService.singUp(data)
    }

    @Post("singin")
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() data: SingInDto): Promise<{name: string, jwtToken: string, email: string}>{
        return await this.userService.singIn(data)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    public async findAll():Promise<User[]>{
        return await this.userService.findAll()
    }
}
