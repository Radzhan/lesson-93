import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateArtistDto } from './create-artist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist, ArtistDocument } from './artists.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.artistModel.find({ _id: id });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    this.artistModel.deleteOne({ _id: id });
    return { message: 'Object was deleted' };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/artists' }),
  )
  async create(
    @Body() artistDto: CreateArtistDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const artist = new this.artistModel({
      name: artistDto.name,
      description: artistDto.description,
      image: file ? '/uploads/artists/' + file.filename : null,
    });

    return artist.save();
  }
}
