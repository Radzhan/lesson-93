import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artists/artists.schema';
import { AlbumsController } from './albums/albums.controller';
import { Albums, AlbumsSchema } from './albums/albums.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Spotify-nest'),

    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: Albums.name, schema: AlbumsSchema }]),
  ],
  controllers: [AppController, ArtistsController, AlbumsController],
  providers: [AppService],
})
export class AppModule {}
