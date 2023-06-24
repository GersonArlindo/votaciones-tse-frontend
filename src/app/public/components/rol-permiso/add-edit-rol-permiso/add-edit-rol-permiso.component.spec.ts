import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRolPermisoComponent } from './add-edit-rol-permiso.component';

describe('AddEditRolPermisoComponent', () => {
  let component: AddEditRolPermisoComponent;
  let fixture: ComponentFixture<AddEditRolPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRolPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRolPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
