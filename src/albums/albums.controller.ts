import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './create-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from './albums.schema';

@Controller('albums')
export class AlbumsController {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}

  @Get()
  async getAll(@Query() query: { artist: string }) {
    if (query.artist === undefined) {
      return this.albumModel.find();
    } else {
      return this.albumModel.find({ artist: query.artist });
    }
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.albumModel.find({ _id: id });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    this.albumModel.deleteOne({ _id: id });
    return { message: 'Object was deleted' };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/albums' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() albumData: CreateAlbumDto,
  ) {
    const album = new this.albumModel({
      artist: albumData.artist,
      year: albumData.year,
      name: albumData.name,
      image: file ? '/uploads/albums/' + file.filename : null,
    });

    return album.save();
  }
}
