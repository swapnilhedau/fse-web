import { TestBed } from '@angular/core/testing';

import { ViewtaskService } from './viewtask.service';

describe('ViewtaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewtaskService = TestBed.get(ViewtaskService);
    expect(service).toBeTruthy();
  });
});
