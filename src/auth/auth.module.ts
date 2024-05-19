// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../user/strategy/google.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, UserModule],
  providers: [GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
