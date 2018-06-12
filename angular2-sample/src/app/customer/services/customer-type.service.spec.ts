import { TestBed, inject } from '@angular/core/testing';

import { CustomerTypeService } from './customer-type.service';

describe('CustomerTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerTypeService]
    });
  });

  it('should ...', inject([CustomerTypeService], (service: CustomerTypeService) => {
    expect(service).toBeTruthy();
  }));
});
