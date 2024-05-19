// src/users/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ require: false })
  picture: string;

  @Prop({ require: false })
  accessToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
