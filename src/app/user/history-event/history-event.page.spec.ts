import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryEventPage } from './history-event.page';

describe('HistoryEventPage', () => {
  let component: HistoryEventPage;
  let fixture: ComponentFixture<HistoryEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
