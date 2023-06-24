import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAssignAppmtComponent } from './add-edit-assign-appmt.component';

describe('AddEditAssignAppmtComponent', () => {
  let component: AddEditAssignAppmtComponent;
  let fixture: ComponentFixture<AddEditAssignAppmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAssignAppmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAssignAppmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
