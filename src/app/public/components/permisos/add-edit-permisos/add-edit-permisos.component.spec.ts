import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPermisosComponent } from './add-edit-permisos.component';

describe('AddEditPermisosComponent', () => {
  let component: AddEditPermisosComponent;
  let fixture: ComponentFixture<AddEditPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPermisosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
