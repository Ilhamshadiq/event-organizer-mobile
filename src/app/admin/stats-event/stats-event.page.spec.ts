import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsEventPage } from './stats-event.page';

describe('StatsEventPage', () => {
  let component: StatsEventPage;
  let fixture: ComponentFixture<StatsEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
