import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { HttpClientModule } from '@angular/common/http';

import { FeatherIconModule } from '@core/directives/feather-icon/feather-icon.module';

import { AngularCropperjsModule } from 'angular-cropperjs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SortablejsModule } from 'ngx-sortablejs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'

      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSpinnerModule,
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
  ]
})
export class AuthModule { }
