import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherIconModule } from '@core/directives/feather-icon/feather-icon.module';
import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralComponent } from './general.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
    ]
  }
]

@NgModule({
  declarations: [GeneralComponent, ProfileComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule
  ]
})
export class GeneralModule { }
