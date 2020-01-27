import { TestBed } from '@angular/core/testing';

import { StudentAsyncService } from './student-async.service';

describe('StudentAsyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentAsyncService = TestBed.get(StudentAsyncService);
    expect(service).toBeTruthy();
  });
});
