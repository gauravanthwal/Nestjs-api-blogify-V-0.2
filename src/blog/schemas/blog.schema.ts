import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Blog {
  @Prop({ isRequired: true })
  title: string;

  @Prop({ isRequired: false })
  description: string;

  @Prop({ isRequired: true })
  body: string;

  @Prop({ isRequired: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
