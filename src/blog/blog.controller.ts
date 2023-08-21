import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { AuthGuard } from 'src/auth/authguard/authguard.guard';
import { Types } from 'mongoose';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createBlog(@Body() blogBody: CreateBlogDto) {
    return this.blogService.createNewBlog(blogBody);
  }

  @Get('/getAllBlogs')
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get('/getBlogById/:blogId')
  async getBlogById(@Param('blogId') blogId: Types.ObjectId) {
    return this.blogService.getBlogById(blogId);
  }

  @Put('/updateBlog/:blogId')
  async updateBlog(
    @Param('blogId') blogId: Types.ObjectId,
    @Body() blogBody: UpdateBlogDto,
  ) {
    return this.blogService.updateBlog(blogId, blogBody);
  }

  @Delete('/remove/:blogId')
  async removeBlog(@Param('blogId') blogId: Types.ObjectId) {
    return this.blogService.removeBlog(blogId);
  }

  @Delete('/removeAllBlogs')
  async deleteAllBlogs() {
    const blogs = this.blogService.removeAllBlogs();
    return blogs;
  }
}
