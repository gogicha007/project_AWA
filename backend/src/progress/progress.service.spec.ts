import { Test, TestingModule } from '@nestjs/testing';
import { ProgressService } from './progress.service';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressService],
    }).compile();

    service = module.get<ProgressService>(ProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
