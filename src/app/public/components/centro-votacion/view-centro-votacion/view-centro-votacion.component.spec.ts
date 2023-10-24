import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCentroVotacionComponent } from './view-centro-votacion.component';

describe('ViewCentroVotacionComponent', () => {
  let component: ViewCentroVotacionComponent;
  let fixture: ComponentFixture<ViewCentroVotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCentroVotacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCentroVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
