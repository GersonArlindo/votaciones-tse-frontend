import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModulosComponent } from './view-modulos.component';

describe('ViewModulosComponent', () => {
  let component: ViewModulosComponent;
  let fixture: ComponentFixture<ViewModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewModulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
