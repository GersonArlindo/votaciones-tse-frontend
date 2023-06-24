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
import { ViewPermisosComponent } from './view-permisos/view-permisos.component';
import { AddEditPermisosComponent } from './add-edit-permisos/add-edit-permisos.component';
import { PermisosComponent } from './permisos.component';

import { NgSelectModule } from '@ng-select/ng-select';

import { DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

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
    component: PermisosComponent,
    children: [
      {
        path: '',
        redirectTo: 'view/:id',
        pathMatch: 'full'

      },
      {
        path: 'view/:id',
        component: ViewPermisosComponent,
      },
      {
        path: 'add/:type',
        component: AddEditPermisosComponent,
      },
      {
        path: 'edit/:type/:id',
        component: AddEditPermisosComponent,
      }
    ]
  },
]

@NgModule({
  declarations: [
    PermisosComponent,
    ViewPermisosComponent,
    AddEditPermisosComponent
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
    NgSelectModule, // Ng-select
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
export class PermisosModule { }
