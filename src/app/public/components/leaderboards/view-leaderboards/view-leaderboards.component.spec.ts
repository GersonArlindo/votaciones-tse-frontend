import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaderboardsComponent } from './view-leaderboards.component';

describe('ViewLeaderboardsComponent', () => {
  let component: ViewLeaderboardsComponent;
  let fixture: ComponentFixture<ViewLeaderboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaderboardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
