import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeZoneComponent } from './view-time-zone.component';

describe('ViewTimeZoneComponent', () => {
  let component: ViewTimeZoneComponent;
  let fixture: ComponentFixture<ViewTimeZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTimeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
