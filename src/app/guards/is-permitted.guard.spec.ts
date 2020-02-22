import { TestBed, async, inject } from '@angular/core/testing';

import { IsPermittedGuard } from './is-permitted.guard';

describe('IsPermittedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsPermittedGuard]
    });
  });

  it('should ...', inject([IsPermittedGuard], (guard: IsPermittedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
