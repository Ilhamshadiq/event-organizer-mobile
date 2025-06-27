import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartJsPage } from './cart-js.page';

describe('CartJsPage', () => {
  let component: CartJsPage;
  let fixture: ComponentFixture<CartJsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartJsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
