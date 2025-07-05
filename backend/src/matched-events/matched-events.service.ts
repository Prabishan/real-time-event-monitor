import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchedEvent } from './matched-events.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchedEventsService {
    constructor(@InjectRepository(MatchedEvent)
    private readonly matchedEventsRepository: Repository<MatchedEvent>
    ) { }


    async findAll(): Promise<MatchedEvent[]> {
        return this.matchedEventsRepository.find({ order: { created_at: 'DESC' } });
    }

}
