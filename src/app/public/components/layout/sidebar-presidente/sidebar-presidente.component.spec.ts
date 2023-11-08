import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPresidenteComponent } from './sidebar-presidente.component';

describe('SidebarPresidenteComponent', () => {
  let component: SidebarPresidenteComponent;
  let fixture: ComponentFixture<SidebarPresidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPresidenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
