import { Test, TestingModule } from '@nestjs/testing';
import { BoqController } from './boq.controller';
import { BoqService } from './boq.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('BoqController', () => {
  let controller: BoqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoqController],
      providers: [BoqService],
    }).compile();

    controller = module.get<BoqController>(BoqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
