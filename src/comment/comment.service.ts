import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { AuthService } from 'src/auth/auth.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Blog } from 'src/blog/schemas/blog.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    private authService: AuthService,
  ) {}

  // ADD A NEW COMMENT
  async addComment(blogId: Types.ObjectId, commentData: CreateCommentDto) {
    try {
      const user = await this.authService.verifyAuthorizationToken();

      if (!user) {
        throw new UnauthorizedException('UnAuthorized user');
      }

      const blog = await this.blogModel.findById(blogId);

      if (!blog) {
        throw new BadRequestException('Unable to add comment');
      }

      const commentPayload = {
        ...commentData,
        user: user._id,
        blog: blogId,
      };
      const comment = await this.commentModel.create(commentPayload);

      return comment;
    } catch (err) {
      throw new BadRequestException('Unable to add comment');
    }
  }

  async getAllComments() {
    const comments = await this.commentModel.find();
    return comments;
  }

  async removeAllComments() {
    const comments = await this.commentModel.deleteMany();
    return comments;
  }
}
