import { TestBed } from '@angular/core/testing';

import { OrderHeadService } from './order-head.service';

describe('OrderHeadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderHeadService = TestBed.get(OrderHeadService);
    expect(service).toBeTruthy();
  });
});
