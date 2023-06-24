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
import { LeadsComponent } from './leads.component';
import { ViewLeadsComponent } from './view-leads/view-leads.component';
import { AddEditLeadsComponent } from './add-edit-leads/add-edit-leads.component';
import { DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { NgxMaskModule } from 'ngx-mask';

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
    component: LeadsComponent,
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'

      },
      {
        path: 'view',
        component: ViewLeadsComponent,
      },
      {
        path: 'add',
        component: AddEditLeadsComponent,
      },
      {
        path: 'edit/:id',
        component: AddEditLeadsComponent,
      },
      {
        path: 'details/:lead',
        component: LeadDetailsComponent,
      }
    ]
  },
]

@NgModule({
  declarations: [
    LeadsComponent,
    ViewLeadsComponent,
    AddEditLeadsComponent,
    LeadDetailsComponent
    //LanguageComponent,
    //ViewLanguageComponent,
    //AddEditLanguageComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
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
export class LeadsModule { }
