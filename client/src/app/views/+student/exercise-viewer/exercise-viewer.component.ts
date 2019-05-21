import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';
import { User } from '@app/core/model/user.model';
import { AuthService } from '@app/core/services/auth.service';


const exerciseQuery = gql`
  query exercise($id: String!) {
    exercise(id: $id) {
      id
      code
      scale
      level
      description
    }
  }
`;

const createExeciseData = gql`
  mutation createExerciseData($data: ExerciseDataCreateInput!) {
    createExerciseData(data: $data) {
      id
    }
  }
`;

@Component({
  selector: 'app-exercise-viewer',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="98%">
        <div class="mat-elevation-z8 info loading-shade" *ngIf="!exercise && !loading">
          <h1 class="mat-h1">El ejercicio con id {{idExercise}} no existe</h1>
        </div>
      </div>
    </div>
    <div *ngIf="exercise" class="grid-container">
      <mat-toolbar color="accent" style="top: 60px; position: sticky; z-index: 100;">
        <h2>Nivel de Atención ({{exercise.level}})</h2>
      </mat-toolbar>
      <div class="container mat-elevation-z8" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
        <div class="item" fxFlex="98%" fxFlex.xs="100%" fxFlex.md="99%">
          <mat-card>
            <mat-card-title>
              <mat-toolbar>
                <span>{{exercise.description}}</span>
                <span class="spacer"></span>
              </mat-toolbar>
            </mat-card-title>
            <mat-card-content>

              <div [ngSwitch]="exercise?.code">

                <app-semeat-a6 *ngSwitchCase="'A6'" [user]="user" [exercise]="exercise" (save)="saveExercise($event)"></app-semeat-a6>
                <app-semeat-a7 *ngSwitchCase="'A7'" [user]="user" [exercise]="exercise" (save)="saveExercise($event)"></app-semeat-a7>

                <app-semeat-ab *ngSwitchCase="'A8'" [question]="'arrow_forward'"
                      [user]="user" [exercise]="exercise" (save)="saveExercise($event)"></app-semeat-ab>
                <app-semeat-ab *ngSwitchCase="'A9'" [question]="'arrow_back'"
                      [user]="user" [exercise]="exercise" (save)="saveExercise($event)"></app-semeat-ab>
                <app-semeat-ab *ngSwitchCase="'B1'" [question]="'arrow_downward'"
                      [user]="user" [exercise]="exercise" (save)="saveExercise($event)"></app-semeat-ab>
                <app-semeat-ab *ngSwitchCase="'B2'" [question]="'arrow_upward'"
                      [user]="user" [exercise]="exercise" (save)="saveExercise($event)"></app-semeat-ab>

                <div *ngSwitchDefault>
                  <h4 class="mat-h4">No se encuentra el ejercicio</h4>
                </div>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button color="accent" mat-raised-button routerLink="/dashboard"><mat-icon>dashboard</mat-icon> Escritorio</button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ExerciseViewerComponent implements OnInit, OnDestroy {

  dificulty: string;
  idExercise: string;
  loading = false;

  currentUser: Observable<User>;
  user: User;

  exercise: Exercise;
  exerciseQuerySubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getAsyncUser();

    this.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.dificulty =  this.activatedRoute.snapshot.params['dificulty'];
    this.idExercise =  this.activatedRoute.snapshot.params['id'];

    this.loading = true;

    this.exerciseQuerySubscription = this.apollo
        .watchQuery<any>({
          query: exerciseQuery,
          variables: {
            'id': this.idExercise
          }
        })
        .valueChanges.subscribe(
          ({ data, loading }) => {
            this.loading = loading;
            if (!loading) {
              this.exercise = data.exercise;
            }
          },
          (error) => {
            this.loading = false;
            this.snackBar.open(error.graphQLErrors[0].message, 'X', {
              duration: 3000
            });
          }
        );
  }

  ngOnDestroy(): void {
    this.exerciseQuerySubscription.unsubscribe();
  }

  saveExercise($datas) {
    if ($datas) {
      this.apollo.mutate({
        mutation: createExeciseData,
        variables: {
          data: $datas
        }
      }).subscribe(( {data} ) => {
        this.loading = false;

        if (data) {
          this.snackBar.open(`Ejercicio guardado correctamente`, 'X', {duration: 3000});
        }
      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });
    } else {
      this.snackBar.open('Error al guardar ejercicio...', 'X', {duration: 3000});
    }
  }
}
