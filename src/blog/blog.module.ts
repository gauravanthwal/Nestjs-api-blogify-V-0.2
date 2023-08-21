import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { CommentSchema } from 'src/comment/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Blog', schema: BlogSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService, AuthService],
})
export class BlogModule {}
