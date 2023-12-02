import { TestBed } from '@angular/core/testing';

import { SupabasseService } from './supabasse.service';

describe('SpabasseService', () => {
  let service: SupabasseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabasseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
