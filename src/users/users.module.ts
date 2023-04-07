import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name:"User",
        schema: userSchema
        }]),
        AuthModule
    ],
    controllers: [UsersController],
    providers: [UserService]
})
export class UsersModule {}
