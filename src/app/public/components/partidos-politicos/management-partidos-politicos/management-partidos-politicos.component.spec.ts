import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementPartidosPoliticosComponent } from './management-partidos-politicos.component';

describe('ManagementPartidosPoliticosComponent', () => {
  let component: ManagementPartidosPoliticosComponent;
  let fixture: ComponentFixture<ManagementPartidosPoliticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementPartidosPoliticosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementPartidosPoliticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
