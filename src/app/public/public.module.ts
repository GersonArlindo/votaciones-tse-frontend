import { LayoutModule } from './components/layout/layout.module';
import { AppRoutingModule } from './../app-routing.module';
import { HttpInterceptorModule } from './../core/services/http-interceptor.module';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthModule } from './components/auth/auth.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    AuthModule,
    DashboardModule,
    PerfectScrollbarModule,
    CoreModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    NgxSpinnerModule,
    HttpInterceptorModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    JwtHelperService,
    AuthGuard,
  ]
})
export class PublicModule { }