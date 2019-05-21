import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { routerTransition } from '@app/core/animations/router.transition';
import { environment as env } from '@env/environment';
import { User } from '@app/core/model/user.model';

@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport="false"
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="!(isHandset$ | async) && (isLoggedIn | async)">
        <mat-toolbar class="sidenav-navbar" color="primary">
          <img class="logo" src="assets/icono.svg" />
          <span>{{appName}}</span>
          <span class="spacer"></span>
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()">
            <mat-icon aria-label="Side nav toggle icon">close</mat-icon>
          </button>
        </mat-toolbar>

        <mat-nav-list *ngIf="(isLoggedIn | async)">
          <a class="menu" mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon aria-label="dashboard">dashboard</mat-icon>
            <span>Escritorio</span>
          </a>
        </mat-nav-list>

        <mat-divider></mat-divider>

        <mat-nav-list *ngIf="(isAdmin | async)">
          <a class="menu" mat-list-item routerLink="/admin/user" routerLinkActive="active">
            <mat-icon aria-label="users">person</mat-icon>
            <span>Gestión de Usuarios</span>
          </a>
          <a class="menu" mat-list-item routerLink="/admin/role" routerLinkActive="active">
            <mat-icon aria-label="roles">supervisor_account</mat-icon>
            <span>Gestión de Roles</span>
          </a>
          <a class="menu" mat-list-item routerLink="/admin/file" routerLinkActive="active">
            <mat-icon aria-label="files">folder</mat-icon>
            <span>Gestión de Archivos</span>
          </a>
        </mat-nav-list>

        <mat-divider></mat-divider>

        <mat-nav-list *ngIf="(isSpecialist | async)">
          <a class="menu" mat-list-item routerLink="/admin/exercise" routerLinkActive="active">
            <mat-icon aria-label="exercises">extension</mat-icon>
            <span>Gestión de Ejercicios</span>
          </a>
          <a class="menu" mat-list-item routerLink="/admin/section" routerLinkActive="active">
            <mat-icon aria-label="sections">reorder</mat-icon>
            <span>Gestión de Secciones</span>
          </a>
          <a class="menu" mat-list-item routerLink="/admin/test" routerLinkActive="active">
            <mat-icon aria-label="test">assignment</mat-icon>
            <span>Gestión de Cuestionarios</span>
          </a>
        </mat-nav-list>

      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar class="navbar" color="primary">
          <mat-toolbar-row>
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>

            <span *ngIf="!(isHandset$ | async)">{{appName}}</span>
            <span class="spacer"></span>

            <button mat-button [matMenuTriggerFor]="menu">
              <span *ngIf="isLoggedIn | async">Bienvenido {{(user | async).firstname}}</span>
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item *ngIf="isLoggedIn | async" routerLink="auth/change_password">
                <mat-icon>lock_open</mat-icon>
                <span>Cambiar Contraseña</span>
              </button>

              <button mat-menu-item *ngIf="isLoggedIn | async" routerLink="auth/profile">
                <mat-icon>person</mat-icon>
                <span>Pérfil</span>
              </button>

              <mat-divider *ngIf="isLoggedIn | async"></mat-divider>

              <button mat-menu-item *ngIf="isLoggedIn | async"  (click)="logout()">
                <mat-icon>exit_to_app</mat-icon>
                <span>Cerrar Sesión</span>
              </button>
              <button mat-menu-item *ngIf="!(isLoggedIn | async)" routerLink="auth/signup">
                <mat-icon>account_circle</mat-icon>
                <span>Regístrase</span>
              </button>

              <button mat-menu-item *ngIf="!(isLoggedIn | async)" routerLink="auth/login">
                <mat-icon>lock_open</mat-icon>
                <span>Iniciar Sesión</span>
              </button>
            </mat-menu>
          </mat-toolbar-row>
        </mat-toolbar>

        <div class="layout">
          <div class="router">
            <div class="item" [@routerTransition]="o.isActivated && o.activatedRoute.routeConfig.path">
              <router-outlet #o="outlet"></router-outlet>
            </div>
          </div>

          <br/>

          <footer class="footer">
            <mat-toolbar color="primary">
              <span>{{appName}} &#169; {{year}} - Todos los Derechos Reservados</span>
            </mat-toolbar>
          </footer>
        </div>

      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .router {
      min-height: 87vh;
      height: auto;
    }

    .layout {
      padding-top: 65px;
    }

    .sidenav-container {
      height: 100%;
    }

    mat-nav-list a.menu {
      margin-top: 2px;
      margin-bottom: 2px;
    }

    .navbar {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
      position: fixed;
      z-index: 1025;
      right: 0;
      top: 0;
      left: 0;
    }

    .sidenav {
      box-shadow: 3px 0 6px rgba(0,0,0,.24);
    }

    .sidenav-navbar {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    }

    .mat-toolbar-row, .mat-toolbar-single-row {
      height: 64px;
    }

    mat-toolbar button.active, mat-toolbar a.active {
      color: white;
      background: rgba(27, 26, 26, 0.2);
      padding-top: 13.5px;
      padding-bottom: 13px;
    }

    mat-toolbar button.mat-button, mat-toolbar a.mat-button {
      color: white;
      padding-top: 13.5px;
      padding-bottom: 13px;
    }

    a.active {
      background: rgba(27, 26, 26, 0.2);
    }

    .logo {
      width: 50px;
      padding-left: 10px;
      padding-right: 10px;
    }

    footer > .mat-toolbar {
      white-space: normal;
      padding-top: 20px;
      height: 80px;
    }

    .mat-list, .mat-nav-list {
      padding-top: 3px;
      padding-bottom: 3px;
      display: block;
    }

  `],
  animations: [routerTransition]
})
export class LayoutComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  isAdmin: Observable<boolean>;
  isSpecialist: Observable<boolean>;
  user: Observable<User>;

  envName = env.envName;
  appName = env.appName;
  year = new Date().getFullYear();
  isProd = env.production;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getAsyncUser();

    this.isAdmin = this.authService.isAdmin();
    this.isSpecialist = this.authService.isSpecialist();
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Usted a cerrado su sesión', 'X', {duration: 3000});
    this.router.navigate(['auth', 'login']);
  }

}
