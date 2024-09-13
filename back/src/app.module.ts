import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { InterestModule } from './interest/interest.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL_MONGODB),
    PrismaModule,
    ConfigModule.forRoot({isGlobal:true,}),
    AuthModule,
    PostModule,
    InterestModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
