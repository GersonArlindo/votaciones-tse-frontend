import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatoComponent } from './view-candidato.component';

describe('ViewCandidatoComponent', () => {
  let component: ViewCandidatoComponent;
  let fixture: ComponentFixture<ViewCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCandidatoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
