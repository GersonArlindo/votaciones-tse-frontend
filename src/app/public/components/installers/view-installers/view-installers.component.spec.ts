import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInstallersComponent } from './view-installers.component';

describe('ViewInstallersComponent', () => {
  let component: ViewInstallersComponent;
  let fixture: ComponentFixture<ViewInstallersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInstallersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInstallersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
