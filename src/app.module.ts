import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot("mongodb+srv://user:user@cluster0.5oho7kb.mongodb.net/?retryWrites=true&w=majority"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
