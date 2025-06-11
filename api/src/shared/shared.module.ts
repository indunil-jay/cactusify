import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { AuthenticationGuard } from './guards/authentication.guard';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },

    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    AccessTokenGuard,
    AuthenticationGuard,
  ],
  exports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class SharedModule {}
