import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSalesRepComponent } from './add-edit-sales-rep.component';

describe('AddEditSalesRepComponent', () => {
  let component: AddEditSalesRepComponent;
  let fixture: ComponentFixture<AddEditSalesRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSalesRepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSalesRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
