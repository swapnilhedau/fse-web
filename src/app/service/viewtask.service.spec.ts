import { TestBed } from '@angular/core/testing';

import { ViewtaskService } from './viewtask.service';
import { HttpClientModule } from '@angular/common/http';

describe('ViewtaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ViewtaskService = TestBed.get(ViewtaskService);
    expect(service).toBeTruthy();
  });
});
