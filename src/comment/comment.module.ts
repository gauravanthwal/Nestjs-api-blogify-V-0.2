import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/blog/schemas/blog.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Blog', schema: BlogSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, AuthService],
})
export class CommentModule {}
