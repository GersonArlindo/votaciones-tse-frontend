import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementJrvComponent } from './management-jrv.component';

describe('ManagementJrvComponent', () => {
  let component: ManagementJrvComponent;
  let fixture: ComponentFixture<ManagementJrvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementJrvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementJrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
