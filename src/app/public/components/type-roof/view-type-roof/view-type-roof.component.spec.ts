import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTypeRoofComponent } from './view-type-roof.component';

describe('ViewTypeRoofComponent', () => {
  let component: ViewTypeRoofComponent;
  let fixture: ComponentFixture<ViewTypeRoofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTypeRoofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTypeRoofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
