import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignAppmtComponent } from './view-assign-appmt.component';

describe('ViewAssignAppmtComponent', () => {
  let component: ViewAssignAppmtComponent;
  let fixture: ComponentFixture<ViewAssignAppmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignAppmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignAppmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
