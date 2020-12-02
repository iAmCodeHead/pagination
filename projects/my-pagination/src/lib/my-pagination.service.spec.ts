import { TestBed } from '@angular/core/testing';

import { MyPaginationService } from './my-pagination.service';

describe('MyPaginationService', () => {
  let service: MyPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
