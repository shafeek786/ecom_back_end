import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ default: 'vendor' })
  type: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  mobile: number;

  @Prop({ default: false })
  isapproved: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
