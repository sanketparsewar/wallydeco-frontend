import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDataTableComponent } from './order-data-table.component';

describe('OrderDataTableComponent', () => {
  let component: OrderDataTableComponent;
  let fixture: ComponentFixture<OrderDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
