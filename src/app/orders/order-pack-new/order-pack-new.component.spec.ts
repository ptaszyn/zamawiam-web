import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPackNewComponent } from './order-pack-new.component';

describe('OrderPackNewComponent', () => {
  let component: OrderPackNewComponent;
  let fixture: ComponentFixture<OrderPackNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPackNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPackNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
