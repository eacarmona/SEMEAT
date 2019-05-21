import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeCl from '@angular/common/locales/es-CU';

registerLocaleData(localeCl, 'es-CU');

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { AuthGuard } from '@app/core/guard/auth.guard';
import { SemeatModule } from './semeat/semeat.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './views/+auth/auth.module#AuthModule',
  },
  {
    path: '',
    loadChildren: './views/+dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './views/+admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'student',
    loadChildren: './views/+student/student.module#StudentModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './views/+dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: './views/+home/home.module#HomeModule',
    //canLoad: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: './views/+error/error.module#ErrorModule',
  },
  { path: '**', redirectTo: 'error/unauthorized' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,

    SharedModule.forRoot(),
    SemeatModule.forRoot(),
    CoreModule,

    RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })

  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-CU' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }