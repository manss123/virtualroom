import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module'
import { QuestionnairesModule } from './questionnaires/questionnaires.module'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ThrottlerModule.forRoot([{ttl: 60, limit: 60}]),
    PrismaModule,
    AuthModule,
    UsersModule,
    QuestionnairesModule,
  ],
  providers: [AuthService, UsersService],
  controllers: [AuthController, UsersController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
