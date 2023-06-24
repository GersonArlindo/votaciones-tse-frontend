import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermisosComponent } from './view-permisos.component';

describe('ViewPermisosComponent', () => {
  let component: ViewPermisosComponent;
  let fixture: ComponentFixture<ViewPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPermisosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
