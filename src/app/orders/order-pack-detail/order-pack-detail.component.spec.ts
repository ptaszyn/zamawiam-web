import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackDetailComponent } from './order-pack-detail.component';

describe('OrderPackDetailComponent', () => {
  let component: OrderPackDetailComponent;
  let fixture: ComponentFixture<OrderPackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPackDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
