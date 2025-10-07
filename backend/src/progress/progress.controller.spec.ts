import { Test, TestingModule } from '@nestjs/testing';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('ProgressController', () => {
  let controller: ProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressController],
      providers: [ProgressService],
    }).compile();

    controller = module.get<ProgressController>(ProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
