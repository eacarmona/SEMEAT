import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Exercise } from '@app/core/model/exercise.model';

const exerciseQuery = gql`
  query exercise($id: String!) {
    exercise(id: $id) {
      id
      code
      point
      level
      description
    }
  }
`;

@Component({
  selector: 'app-exercise-details',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-card class="exercise-details-card">
            <mat-card-header>
              <mat-card-title>
                <h1>Detalles Ejercicio</h1>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content>

              <div *ngIf="exerciseData">

                <mat-grid-list cols="2" rowHeight="6:1">
                    <mat-grid-tile><h3>Id:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{exerciseData.id}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Código:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{exerciseData.code}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Puntos:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{exerciseData.point}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Nivel de Atención:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{exerciseData.level}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Descripción:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{exerciseData.description}}</h3></mat-grid-tile>

                </mat-grid-list>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="accent" routerLink="/admin/exercise" routerLinkActive type="button" aria-label="details">
                <mat-icon>list</mat-icon>
                <span>Listado de ejercicios</span>
              </button>
              <button *ngIf="exerciseData" mat-raised-button color="primary" [routerLink]="['/admin','exercise', 'update', exerciseData.id]"
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

      mat-chip.exercise {
        margin: 10px;
      }
    `
  ]
})
export class ExerciseDetailsComponent implements OnInit, OnDestroy {
  exerciseData: Exercise;
  exerciseId: string;
  loading = false;
  exerciseQuerySubscription: Subscription;

  constructor(
    private activedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.exerciseId = this.activedRoute.snapshot.params['id'];

    this.loading = true;

    this.exerciseQuerySubscription = this.apollo
      .watchQuery<any>({
        query: exerciseQuery,
        variables: {
          id: this.exerciseId
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.exerciseData = data.exercise;
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
    this.exerciseQuerySubscription.unsubscribe();
  }
}
