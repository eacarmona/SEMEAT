import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import gql from 'graphql-tag';


const createExercise = gql`
  mutation createExercise($data: ExerciseCreateInput!) {
    createExercise(data: $data) {
      code
      description
    }
  }
`;

@Component({
  selector: 'app-exercise-create',
  template: `
    <div class="container">
      <div class="loading">
        <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
      </div>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <form [formGroup]="createExerciseForm" #f="ngForm" (ngSubmit)="onCreateExercise()" class="form">
            <mat-card class="exercise-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Crear Ejercicio</h1>
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
                  <textarea matInput placeholder="Descripción" formControlName="description"></textarea>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!createExerciseForm.valid" aria-label="createExercise">
                  <mat-icon>add</mat-icon>
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
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class ExerciseCreateComponent implements OnInit {

  createExerciseForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) { }

  ngOnInit() {

    this.createExerciseForm = this.formBuilder.group({
      code: ['', Validators.required],
      scale: ['', Validators.required],
      level: ['', Validators.required],
      description: ['']
    });
  }

  onCreateExercise(): void {

    this.loading = true;

    if (this.createExerciseForm.valid) {

      this.createExerciseForm.disable();
      this.apollo.mutate({
        mutation: createExercise,
        variables: {
          data: {
            'code': this.createExerciseForm.value.code,
            'level': this.createExerciseForm.value.level,
            'scale': this.createExerciseForm.value.scale,
            'description': this.createExerciseForm.value.description,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.createExerciseForm.enable();

        if (data) {
          this.snackBar.open(`Ejercicio ${data.createExercise.code} creado correctamente`, 'X', {duration: 3000});
          this.router.navigate(['admin', 'exercise']);
        }
      }, (error) => {
        this.loading = false;
        this.createExerciseForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
