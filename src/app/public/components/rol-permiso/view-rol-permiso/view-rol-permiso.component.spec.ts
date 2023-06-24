import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRolPermisoComponent } from './view-rol-permiso.component';

describe('ViewRolPermisoComponent', () => {
  let component: ViewRolPermisoComponent;
  let fixture: ComponentFixture<ViewRolPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRolPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRolPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
