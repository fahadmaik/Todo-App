import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './strategy/jwt.trategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key-here', // Replace with your actual secret key
      signOptions: {
        expiresIn: '3600s', // Replace with your desired expiration time
      },
    }),
  ],

  controllers: [AuthController],
  providers: [LocalStrategy, jwtStrategy],
})
export class AuthModule {}
