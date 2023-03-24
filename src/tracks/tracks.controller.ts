import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from './track.schema';
import { CreateTrackDto } from './create-track.dto';

@Controller('artists')
export class TracksController {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<TrackDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.trackModel.find();
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    this.trackModel.deleteOne({ _id: id });
    return { message: 'Object was deleted' };
  }

  @Post()
  async create(@Body() trackDto: CreateTrackDto) {
    const track = new this.trackModel({
      name: trackDto.name,
      artist: trackDto.artist,
      time: trackDto.time,
      number: trackDto.number,
    });

    return track.save();
  }
}
