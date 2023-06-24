import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDisqualificationComponent } from './view-disqualification.component';

describe('ViewDisqualificationComponent', () => {
  let component: ViewDisqualificationComponent;
  let fixture: ComponentFixture<ViewDisqualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDisqualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDisqualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
