import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEnergyProvidersComponent } from './view-energy-providers.component';

describe('ViewEnergyProvidersComponent', () => {
  let component: ViewEnergyProvidersComponent;
  let fixture: ComponentFixture<ViewEnergyProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEnergyProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEnergyProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
