import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { PrismaModule } from './prisma.module';
import { TestsModule } from './tests/tests.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, CoursesModule, TestsModule, UploadsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
