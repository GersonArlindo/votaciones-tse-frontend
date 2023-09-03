import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJrvComponent } from './view-jrv.component';

describe('ViewJrvComponent', () => {
  let component: ViewJrvComponent;
  let fixture: ComponentFixture<ViewJrvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJrvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
