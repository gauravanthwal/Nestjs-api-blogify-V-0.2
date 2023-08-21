import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './schemas/blog.schema';
import { Comment } from 'src/comment/schemas/comment.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthService } from 'src/auth/auth.service';
import { Model, Types } from 'mongoose';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable({ scope: Scope.REQUEST })
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private authService: AuthService,
  ) {}

  // CREATE NEW BLOG
  async createNewBlog(blogBody: CreateBlogDto) {
    try {
      const user: any = await this.authService.verifyAuthorizationToken();
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const blog = await this.blogModel.create({
        ...blogBody,
        author: user?._id,
      });

      return blog;
    } catch (err) {
      throw new BadRequestException('Blog did not created');
    }
  }

  // GET ALL BLOGS
  async getAllBlogs() {
    try {
      const blogs = await this.blogModel.find();
      return blogs;
    } catch (err) {
      throw new BadRequestException('Not able to get blogs');
    }
  }

  // GET BLOG BY ID
  async getBlogById(blogId: Types.ObjectId) {
    try {
      const blog = await this.blogModel.findById(blogId);

      if (!blog) {
        throw new BadRequestException('Not able to find blog');
      }

      const comments = await this.commentModel
        .find({ blog: blog._id })
        .populate('user', '-password')
        .exec();

      return { blog, comments };
    } catch (err) {
      throw new BadRequestException('Not able to get blog');
    }
  }

  // UPDATE BLOG BY ID
  async updateBlog(blogId: Types.ObjectId, blogBody: UpdateBlogDto) {
    try {
      const blog = await this.blogModel.findByIdAndUpdate(blogId, blogBody, {
        new: true,
        runValidators: true,
      });
      return blog;
    } catch (err) {
      throw new BadRequestException('Not able to get blog');
    }
  }

  // REMOVE BLOG BY ID
  async removeBlog(blogId: Types.ObjectId) {
    try {
      const blog = await this.blogModel.findByIdAndDelete(blogId);

      const comment = await this.commentModel.deleteMany({ blogId: blogId });

      return { blog, comment };
    } catch (err) {
      throw new BadRequestException('Not able to get blog');
    }
  }

  // EXPERIMENTAL ROUTE
  // REMOVE ALL BLOGS
  async removeAllBlogs() {
    await this.blogModel.deleteMany();
  }
}
