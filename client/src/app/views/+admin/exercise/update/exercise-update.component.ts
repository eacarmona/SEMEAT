import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Exercise } from '@app/core/model/exercise.model';

const updateExercise = gql`
  mutation updateExercise($data: ExerciseUpdateInput!, $where: ExerciseWhereUniqueInput!) {
    updateExercise(data: $data, where: $where) {
      id
      code
      description
    }
  }
`;

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


@Component({
  selector: 'app-exercise-update',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <form [formGroup]="updateExerciseForm" #f="ngForm" (ngSubmit)="onUpdateExercise()" class="form">
            <mat-card class="exercise-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Modificar Ejercicio</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <mat-select placeholder="Código del ejercicio (A1, A2, A3...)" formControlName="code">
                    <mat-option value="A0">Datos generales</mat-option>
                    <mat-option value="A1">Orientación</mat-option>

                    <mat-option value="A2">Dígitos en regresión</mat-option>
                    <mat-option value="A3">Detención visual</mat-option>
                    <mat-option value="A4">20-3</mat-option>
                    <mat-option value="A5">Memoria verbal espontánea</mat-option>

                    <mat-option value="A6">Detección de números grandes y chicos</mat-option>
                    <mat-option value="A7">Rastreo Flechas</mat-option>

                    <mat-option value="A8">Direccionalidad Derecha</mat-option>
                    <mat-option value="A9">Direccionalidad Izquierda</mat-option>
                    <mat-option value="B1">Direccionalidad Arriba</mat-option>
                    <mat-option value="B2">Direccionalidad Abajo</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <mat-select placeholder="Nivel de Atención" formControlName="level">
                    <mat-option value="NINGUNO">No tiene nivel</mat-option>
                    <mat-option value="ENFOCADA">Enfocada</mat-option>

                    <mat-option value="SOSTENIDA">Sostenida</mat-option>
                    <mat-option value="SELECTIVA">Selectiva</mat-option>
                    <mat-option value="ALTERNADA">Alternada</mat-option>
                    <mat-option value="DIVIDIDA">Dividida</mat-option>

                  </mat-select>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <input matInput type="number" placeholder="Scala de puntuación" formControlName="scale">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <textarea matInput type="text" placeholder="Descripción" formControlName="description"></textarea>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!updateExerciseForm.valid" aria-label="updateExercise">
                  <mat-icon>mode_edit</mat-icon>
                  <span>Ejercicio</span>
                </button>

                <button mat-raised-button color="accent" routerLink="/admin/exercise"
                      routerLinkActive type="button" aria-label="exercisesList">
                  <mat-icon>list</mat-icon>
                  <span>Listado de ejercicios</span>
                </button>
              </mat-card-actions>
            </mat-card>
          </form>
        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ]
})
export class ExerciseUpdateComponent implements OnInit, OnDestroy {
  updateExerciseForm: FormGroup;
  exerciseData: Exercise;
  exerciseId: string;
  loading = false;
  exerciseQuerySubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.updateExerciseForm = this.formBuilder.group({
      code: ['', Validators.required],
      level: ['', Validators.required],
      scale: ['', Validators.required],
      description: ['']
    });

    this.exerciseId = this.activatedRoute.snapshot.params['id'];

    this.loading = true;
    this.updateExerciseForm.disable();

    this.exerciseQuerySubscription = this.apollo
      .watchQuery<any>({
        query: exerciseQuery,
        variables: {
          id: this.exerciseId
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          this.exerciseData = data.exercise;
          this.updateExerciseForm.enable();
          this.loading = false;

          this.updateExerciseForm.patchValue({
            code: this.exerciseData.code,
            description: this.exerciseData.description,
            scale: this.exerciseData.scale,
            level: this.exerciseData.level,
          });
        }
      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });
  }

  onUpdateExercise() {
    this.loading = true;

    if (this.updateExerciseForm.valid) {
      this.updateExerciseForm.disable();

      this.apollo
        .mutate({
          mutation: updateExercise,
          variables: {
            data:  {
              'code': this.updateExerciseForm.value.code,
              'description': this.updateExerciseForm.value.description,
              'scale': this.updateExerciseForm.value.scale,
              'level': this.updateExerciseForm.value.level
            },
            where : {
              id: this.exerciseId
            }
          }
        })
        .subscribe(
          ({ data }) => {
            this.loading = false;
            this.updateExerciseForm.enable();

            if (data) {
              this.snackBar.open(
                `Ejercicio ${
                  data.updateExercise.code
                } editado correctamente`,
                'X',
                { duration: 3000 }
              );
              this.router.navigate(['admin', 'exercise']);
            }
          },
          (error) => {
            this.loading = false;
            this.updateExerciseForm.enable();
            this.snackBar.open(error.graphQLErrors[0].message, 'X', { duration: 3000 });
          }
        );
    } else {
      console.log('Form not valid');
    }
  }

  ngOnDestroy(): void {
    this.exerciseQuerySubscription.unsubscribe();
  }
}
