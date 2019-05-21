import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Test } from '@app/core/model/test.model';

const testQuery = gql`
  query test($id: String!) {
    test(id: $id) {
      id
      type
      description
      enable
    }
  }
`;

@Component({
  selector: 'app-test-details',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-card class="test-details-card">
            <mat-card-header>
              <mat-card-title>
                <h1>Detalles Cuestionario</h1>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content>

              <div *ngIf="testData">

                <mat-grid-list cols="2" rowHeight="6:1">
                    <mat-grid-tile><h3>Id:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{testData.id}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Tipo de cuestionario:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{testData.type}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Descripción:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{testData.description}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Habilitado:</h3></mat-grid-tile>
                    <mat-grid-tile>
                      <mat-icon *ngIf="testData.enable" color="primary">done</mat-icon>
                      <mat-icon *ngIf="!testData.enable" color="warn">close</mat-icon>
                    </mat-grid-tile>

                </mat-grid-list>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="accent" routerLink="/admin/test" routerLinkActive type="button" aria-label="details">
                <mat-icon>list</mat-icon>
                <span>Listado de ejercicios</span>
              </button>
              <button *ngIf="testData" mat-raised-button color="primary" [routerLink]="['/admin','test', 'update', testData.id]"
               routerLinkActive="active">
                <mat-icon>mode_edit</mat-icon>
                <span>Editar</span>
              </button>
            </mat-card-actions>
          </mat-card>

        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }

      mat-chip.test {
        margin: 10px;
      }
    `
  ]
})
export class TestDetailsComponent implements OnInit, OnDestroy {
  testData: Test;
  testId: string;
  loading = false;
  testQuerySubscription: Subscription;

  constructor(
    private activedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.testId = this.activedRoute.snapshot.params['id'];

    this.loading = true;

    this.testQuerySubscription = this.apollo
      .watchQuery<any>({
        query: testQuery,
        variables: {
          id: this.testId
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.testData = data.test;
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }

  ngOnDestroy(): void {
    this.testQuerySubscription.unsubscribe();
  }
}
