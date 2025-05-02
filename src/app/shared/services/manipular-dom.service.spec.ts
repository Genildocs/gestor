import { TestBed } from '@angular/core/testing';

import { ManipularDomService } from './manipular-dom.service';

describe('ManipularDomService', () => {
  let service: ManipularDomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipularDomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
