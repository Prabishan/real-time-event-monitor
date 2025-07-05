import { Controller, Get } from '@nestjs/common';
import { MatchedEventsService } from './matched-events.service';

@Controller('matched-events')
export class MatchedEventsController {

    constructor(private readonly service: MatchedEventsService) { }


    @Get()
    findAll() {
        return this.service.findAll();
    }
}
