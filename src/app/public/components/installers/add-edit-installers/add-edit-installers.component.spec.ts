import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInstallersComponent } from './add-edit-installers.component';

describe('AddEditInstallersComponent', () => {
  let component: AddEditInstallersComponent;
  let fixture: ComponentFixture<AddEditInstallersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInstallersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditInstallersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
