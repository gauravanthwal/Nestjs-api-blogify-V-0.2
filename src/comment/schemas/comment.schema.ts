import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ isRequired: true })
  comment: string;

  @Prop({ isRequired: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ isRequired: true, type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  blog: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
