import { TestBed } from '@angular/core/testing';

import { OrderPackService } from './order-pack.service';

describe('OrderPackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderPackService = TestBed.get(OrderPackService);
    expect(service).toBeTruthy();
  });
});
