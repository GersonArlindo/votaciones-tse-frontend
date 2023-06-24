import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignAppmtComponent } from './assign-appmt.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { RouterModule, Routes } from '@angular/router';
import { ViewAssignAppmtComponent } from './view-assign-appmt/view-assign-appmt.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FeatherIconModule } from '@app/core/directives/feather-icon/feather-icon.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SortablejsModule } from 'ngx-sortablejs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TableModule } from 'primeng/table';
import { AddEditAssignAppmtComponent } from './add-edit-assign-appmt/add-edit-assign-appmt.component';
import { AddEditUsersComponent } from '../users/add-edit-users/add-edit-users.component';
import { NgSelectModule } from '@ng-select/ng-select';


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
    component: AssignAppmtComponent,
    children: [
      
      {
        path: '',
        redirectTo: 'view/:id',
        pathMatch: 'full'

      },
      {
        path: 'view/:id',
        component: ViewAssignAppmtComponent,
      },
      {
        path: 'add/:lead',
        component: AddEditAssignAppmtComponent,
      },
      {
        path: 'edit/:lead/:id',
        component: AddEditAssignAppmtComponent,
      },
    ]
  },
]

@NgModule({
  declarations: [
    AssignAppmtComponent,
    ViewAssignAppmtComponent,
    AddEditAssignAppmtComponent,
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule,
    NgSelectModule,
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
export class AssignAppmtModule { }
