import { Module } from '@nestjs/common';
import { MatchedEventsService } from './matched-events.service';
import { MatchedEventsController } from './matched-events.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchedEvent } from './matched-events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MatchedEvent])],
  providers: [MatchedEventsService],
  controllers: [MatchedEventsController]
})
export class MatchedEventsModule { }
