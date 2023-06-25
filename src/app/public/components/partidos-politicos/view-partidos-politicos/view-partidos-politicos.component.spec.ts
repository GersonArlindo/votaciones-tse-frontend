import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartidosPoliticosComponent } from './view-partidos-politicos.component';

describe('ViewPartidosPoliticosComponent', () => {
  let component: ViewPartidosPoliticosComponent;
  let fixture: ComponentFixture<ViewPartidosPoliticosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPartidosPoliticosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPartidosPoliticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
