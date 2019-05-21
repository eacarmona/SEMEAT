import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Section } from '@app/core/model/section.model';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';
import { Exercise } from '@app/core/model/exercise.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';

const exercisesQuery = gql`
  query exercises($where: ExerciseWhereInput!) {
    exercises(where: $where) {
      id
      code
      description
    }
  }
`;

const updateSectionMutation = gql`
  mutation updateSection($where: SectionWhereUniqueInput!, $data: SectionUpdateInput!) {
    updateSection(where: $where, data: $data) {
      id
      exercises {
        id
        code
        description
      }
    }
  }
`;

@Component({
  selector: 'app-section-add',
  template: `
  <div class="container">
    <mat-toolbar>
      <h2 mat-dialog-title>{{data.name}}</h2>
      <span class="spacer"></span>
      <button mat-icon-button color="warn" mat-dialog-close><mat-icon>close</mat-icon></button>
    </mat-toolbar>

    <form class="exercise-form" [formGroup]="addExerciseForm" #f="ngForm" (ngSubmit)="onAddExercise()">
      <div class="full-width">
        <mat-form-field class="half-width">
          <mat-select placeholder="Adicionar ejercicios a esta sección" formControlName="code">
            <mat-option *ngFor="let exercise of exercises" [value]="exercise.code">
              <span>{{exercise.code}}</span> |
              <small>{{exercise.description}}</small>
            </mat-option>
          </mat-select>
        </mat-form-field>

        <span class="spacer"></span>
        <button mat-raised-button color="primary" type="submit"
        [disabled]="!addExerciseForm.valid" aria-label="addExercise">
          <mat-icon>add</mat-icon>
          <span>Ejercicio</span>
        </button>
      </div>
    </form>

    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>

    <div *ngIf="dataSource.length == 0;" fxLayout="row" fxLayoutAlign="start center">
      <div class="item" fxFlex="98%">
        <h1 class="mat-h1">No hay registros</h1>
      </div>
    </div>
    <div [hidden]="!(dataSource.length > 0)">
      <mat-dialog-content>
        <div class="container mat-elevation-z8">
          <table mat-table [dataSource]="dataSource">

            <!-- Code Column -->
            <ng-container matColumnDef="code">
              <th mat-header-cell *matHeaderCellDef> Código </th>
              <td mat-cell *matCellDef="let element"> {{element.code}} </td>
            </ng-container>

            <!-- Description Column -->
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef> Descripción </th>
              <td mat-cell *matCellDef="let element"> {{element.description}} </td>
            </ng-container>

            <!-- delete Column -->
            <ng-container matColumnDef="delete">
              <th mat-header-cell *matHeaderCellDef>
                <span>Eliminar</span>
              </th>
              <td mat-cell *matCellDef="let element">
                <a mat-icon-button (click)="onDelete(element.code)" color="warn"><mat-icon>delete_forever</mat-icon></a>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>
      </mat-dialog-content>
    </div>
  </div>
  `,
  styles: [`
    .container {
      min-height: 30%;
      height: auto;
      margin: 5px;
    }

    table, .full-width {
      width: 100%;
    }

    .full-width {
      width: 100%;
    }

    .half-width {
      width: 87%;
    }
  `]
})
export class SectionAddComponent implements OnInit, OnDestroy {

  displayedColumns = ['code', 'description', 'delete'];
  dataSource: Exercise[];
  loading = false;

  exercisesQuerySubcription: Subscription;
  exercises: Exercise[] = [];

  addExerciseForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Section,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.dataSource = data.exercises;
  }

  ngOnInit() {

    this.addExerciseForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

    this.getExercises();
  }

  getExercises(): void {
    this.loading = true;
    this.addExerciseForm.disable();
    this.exercisesQuerySubcription = this.apollo
      .watchQuery<any>({
        query: exercisesQuery,
        variables: {
          where: {
            'id_not_in': this.dataSource.map(exercise => exercise.id),
          }
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.loading = false;
            this.exercises = data.exercises;
            this.addExerciseForm.enable();
          }
        },
        (error) => {
          this.loading = false;
          this.snackBar.open(error.message, 'X', {
            duration: 3000
          });
        }
      );
  }

  onAddExercise(): void {
    this.loading = true;

    if (this.addExerciseForm.valid) {

      this.addExerciseForm.disable();
      this.apollo.mutate({
        mutation: updateSectionMutation,
        variables: {
          where: {
            'id': this.data.id,
          },
          data: {
            'exercises': {
              'connect': {
                'code': this.addExerciseForm.value.code
              }
            }
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.addExerciseForm.enable();
        if (data) {
          this.snackBar.open(`Se ha adicionado un nuevo ejercicio`, 'X', {duration: 3000});
          this.dataSource = data.updateSection.exercises;
          this.getExercises();
          this.addExerciseForm.reset();
        }
      }, (error) => {
        this.loading = false;
        this.addExerciseForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }

  onDelete(code: string): void {

    if (code) {
      this.apollo.mutate({
        mutation: updateSectionMutation,
        variables: {
          where: {
            'id': this.data.id,
          },
          data: {
            'exercises': {
              'disconnect': {
                'code': code
              }
            }
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.addExerciseForm.enable();

        if (data) {
          this.snackBar.open(`Se ha eliminado un nuevo ejercicio`, 'X', {duration: 3000});
          this.dataSource = data.updateSection.exercises;
          this.getExercises();
        }
      }, (error) => {
        this.loading = false;
        this.addExerciseForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });
    } else {
      this.snackBar.open(`Error no se encuentra ID`, 'X', {duration: 3000});
    }

  }

  ngOnDestroy(): void {
    this.exercisesQuerySubcription.unsubscribe();
  }

}
