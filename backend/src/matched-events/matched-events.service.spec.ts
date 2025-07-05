import { Test, TestingModule } from '@nestjs/testing';
import { MatchedEventsService } from './matched-events.service';

describe('MatchedEventsService', () => {
  let service: MatchedEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchedEventsService],
    }).compile();

    service = module.get<MatchedEventsService>(MatchedEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
