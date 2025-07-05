import { Test, TestingModule } from '@nestjs/testing';
import { MatchedEventsController } from './matched-events.controller';

describe('MatchedEventsController', () => {
  let controller: MatchedEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchedEventsController],
    }).compile();

    controller = module.get<MatchedEventsController>(MatchedEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
