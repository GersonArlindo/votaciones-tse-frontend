import { HttpInterceptorModule } from './core/services/http-interceptor.module';
import { PublicModule } from './public/public.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DashboardModule } from './public/components/dashboard/dashboard.module';
import { AuthModule } from './public/components/auth/auth.module';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutModule } from './public/components/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'  
import {TableModule} from 'primeng/table';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { LoginGuard } from './core/guards/login.guard';
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

@NgModule({
  declarations: [
    AppComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    PublicModule,
    CoreModule,
    AuthModule,
    PerfectScrollbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DashboardModule,
    BrowserModule,
    CommonModule,
    LayoutModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpInterceptorModule,
    MatTableModule,
    TableModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    JwtHelperService,
    LoginGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
