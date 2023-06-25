import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPartidosPoliticosComponent } from './add-edit-partidos-politicos.component';

describe('AddEditPartidosPoliticosComponent', () => {
  let component: AddEditPartidosPoliticosComponent;
  let fixture: ComponentFixture<AddEditPartidosPoliticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPartidosPoliticosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPartidosPoliticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
