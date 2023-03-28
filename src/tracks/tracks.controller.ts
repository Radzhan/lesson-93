import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Track, TrackDocument } from './track.schema';
import { CreateTrackDto } from './create-track.dto';
import { AdminGuardGuard } from '../auth/admin-guard.guard';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { UserGuardGuard } from '../auth/user-guard.guard';

@Controller('tracks')
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
  @UseGuards(TokenAuthGuard, AdminGuardGuard)
  async deleteOne(@Param('id') id: string) {
    return this.trackModel.deleteOne({ _id: id });
  }

  @Post()
  @UseGuards(TokenAuthGuard, UserGuardGuard)
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
