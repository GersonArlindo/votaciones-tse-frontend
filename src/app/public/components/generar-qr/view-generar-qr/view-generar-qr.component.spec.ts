import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGenerarQrComponent } from './view-generar-qr.component';

describe('ViewGenerarQrComponent', () => {
  let component: ViewGenerarQrComponent;
  let fixture: ComponentFixture<ViewGenerarQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGenerarQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGenerarQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
