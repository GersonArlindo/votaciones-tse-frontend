import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { HttpClientModule } from '@angular/common/http';

import { FeatherIconModule } from '@core/directives/feather-icon/feather-icon.module';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SortablejsModule } from 'ngx-sortablejs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ViewAppointmentOutcomeComponent } from './view-appointment-outcome/view-appointment-outcome.component';
import { AddEditAppointmentOutcomeComponent } from './add-edit-appointment-outcome/add-edit-appointment-outcome.component';
import { AppointmentOutcomeComponent } from './appointment-outcome.component';
import { DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

const routes: Routes = [
  {
    path: '',
    component: AppointmentOutcomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'

      },
      {
        path: 'view',
        component: ViewAppointmentOutcomeComponent,
      },
      {
        path: 'add',
        component: AddEditAppointmentOutcomeComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditAppointmentOutcomeComponent,
      }
    ]
  },
]

@NgModule({
  declarations: [
    AppointmentOutcomeComponent,
    ViewAppointmentOutcomeComponent,
    AddEditAppointmentOutcomeComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    PerfectScrollbarModule,
    TableModule,
    FeatherIconModule,
    AngularCropperjsModule,
    CarouselModule,
    SortablejsModule.forRoot({
      animation: 150,
      ghostClass: 'bg-light',
    }),
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
  ]
})
export class AppointmentOutcomeModule { }
