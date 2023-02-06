import { Test, TestingModule } from '@nestjs/testing';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';

describe('TwitterController', () => {
  let controller: TwitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwitterController],
      providers: [TwitterService],
    }).compile();

    controller = module.get<TwitterController>(TwitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
