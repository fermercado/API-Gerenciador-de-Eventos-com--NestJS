import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { ValidationModule } from './validators/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>(
          'MONGODB_USERNAME',
        )}:${configService.get<string>(
          'MONGODB_PASSWORD',
        )}@${configService.get<string>(
          'MONGODB_HOST',
        )}/${configService.get<string>(
          'MONGODB_DATABASE',
        )}?retryWrites=true&w=majority`,
      }),
    }),
    UsersModule,
    EventModule,
    AuthModule,
    UtilsModule,
    ValidationModule,
  ],
})
export class AppModule {}
