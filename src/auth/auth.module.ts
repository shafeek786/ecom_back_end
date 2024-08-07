import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from 'src/Schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule, // Provides configuration values
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configures Passport with JWT strategy
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Connects Mongoose with User schema
    JwtModule.registerAsync({
      imports: [ConfigModule], // Imports ConfigModule for configuration
      inject: [ConfigService], // Injects ConfigService to retrieve configuration values
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Retrieves JWT secret from config
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRE'), // JWT expiration time
        },
      }),
    }),
  ],
  controllers: [AuthController], // AuthController handles authentication routes
  providers: [AuthService, JwtStrategy], // Provides AuthService and JwtStrategy for authentication logic
  exports: [AuthService], // Exports AuthService for use in other modules
})
export class AuthModule {}
