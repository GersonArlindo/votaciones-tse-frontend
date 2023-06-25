import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPersonasNaturalesComponent } from './view-personas-naturales.component';

describe('ViewPersonasNaturalesComponent', () => {
  let component: ViewPersonasNaturalesComponent;
  let fixture: ComponentFixture<ViewPersonasNaturalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPersonasNaturalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPersonasNaturalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
