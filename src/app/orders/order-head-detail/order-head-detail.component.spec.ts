import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeadDetailComponent } from './order-head-detail.component';

describe('OrderHeadDetailComponent', () => {
  let component: OrderHeadDetailComponent;
  let fixture: ComponentFixture<OrderHeadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHeadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHeadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
