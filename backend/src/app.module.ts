import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchedEventsModule } from './matched-events/matched-events.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432', 10),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    autoLoadEntities: true,
    synchronize: true, // Set to false in production
  }),
  MatchedEventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
