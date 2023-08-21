import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/create/:blogId')
  async addComment(
    @Param('blogId') blogId: Types.ObjectId,
    @Body() commentData: CreateCommentDto,
  ) {
    return this.commentService.addComment(blogId, commentData);
  }

  @Get('/getAllComments')
  async getAllComment() {
    return this.commentService.getAllComments();
  }

  @Delete('/removeAllComments')
  async removeAllComment() {
    return this.commentService.removeAllComments()
  }
}
