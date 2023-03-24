import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({ ref: 'Album', required: true })
  artist: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  number: number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
