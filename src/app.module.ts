import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './artists/artists.schema';
import { AlbumsController } from './albums/albums.controller';
import { Album, AlbumSchema } from './albums/albums.schema';
import { Track, TrackSchema } from './tracks/track.schema';
import { TracksController } from './tracks/tracks.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Spotify-nest'),

    MongooseModule.forFeature([{ name: Artist.name, schema: ArtistSchema }]),
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
  ],
  providers: [AppService],
})
export class AppModule {}
