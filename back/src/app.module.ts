import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ConfidentialityModule } from './confidentiality/confidentiality.module';
import { RoleModule } from './role/role.module';
import { FollowersModule } from './followers/followers.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL_MONGODB),
    PrismaModule,
    ConfigModule.forRoot({isGlobal:true,}),
    AuthModule,
    PostModule,
    CommentModule,
    ConfidentialityModule,
    RoleModule,
    FollowersModule,
    UserModule,
    InterestModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
