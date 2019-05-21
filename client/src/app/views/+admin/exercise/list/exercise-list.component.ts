import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
  MatDialog
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '@app/shared/confirm/confirm.component';
import { Exercise } from '@app/core/model/exercise.model';

const exerciseList = gql`
  query exercises {
    exercises {
      id
      code
      scale
      description
      level
    }
  }
`;

const deleteExercise = gql`
  mutation deleteExercise($where: ExerciseWhereUniqueInput!) {
    deleteExercise(where: $where) {
      code
    }
  }
`;

const deleteManyExercises = gql`
  mutation deleteManyExercises($where: ExerciseWhereInput!) {
    deleteManyExercises(where: $where) {
      count
    }
  }
`;

@Component({
  selector: 'app-exercise-list',
  template: `
    <div class="container">
      <div class="loading">
        <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
      </div>
      <br />

      <div fxLayout="row" fxLayoutAlign="center center">
        <div class="item" fxFlex="98%">
          <div class="mat-elevation-z8 info loading-shade" *ngIf="this.dataSource.data.length == 0;">
            <h1 class="mat-h1">No hay registros</h1>
          </div>
        </div>
      </div>

      <div fxLayout="row" fxLayoutAlign="center center">
        <div class="item" fxFlex="98%">
          <button class="create-button" mat-raised-button color="primary" routerLink="/admin/exercise/create" routerLinkActive="active">
            <mat-icon>add</mat-icon>
            <span>Ejercicio</span>
          </button>
        </div>
      </div>

      <br />

      <div [hidden]="!(this.dataSource.data.length > 0)">

        <div fxLayout="row" fxLayoutAlign="center center">
          <div class="item" fxFlex="98%">

            <div class="mat-elevation-z8">

              <mat-form-field class="full-width">
                <mat-icon matPrefix>search</mat-icon>
                <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filtrado por código y descripción">
              </mat-form-field>

              <mat-table #table [dataSource]="dataSource" matSort aria-label="Elements">

                <!-- Checkbox Column -->
                <ng-container matColumnDef="select">
                  <mat-header-cell fxFlex="10" *matHeaderCellDef>
                    <mat-checkbox (change)="$event ? masterToggle() : null"
                    [checked]="selection.hasValue() && isAllSelected()" [indeterminate]="selection.hasValue() && !isAllSelected()">
                    </mat-checkbox>
                  </mat-header-cell>
                  <mat-cell fxFlex="10" *matCellDef="let row">
                    <mat-checkbox (click)="$event.stopPropagation()"
                    (change)="$event ? selection.toggle(row) : null" [checked]="selection.isSelected(row)">
                    </mat-checkbox>
                  </mat-cell>
                </ng-container>

                <!-- Code Column -->
                <ng-container matColumnDef="code">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Código</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.code}}</mat-cell>
                </ng-container>

                <!-- Point Column -->
                <ng-container matColumnDef="scale">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Escala de Puntos</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.scale}}</mat-cell>
                </ng-container>

                <!-- Level Column -->
                <ng-container matColumnDef="level">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Nivel de Atención</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.level}}</mat-cell>
                </ng-container>

                <!-- Description Column -->
                <ng-container matColumnDef="description">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Descripción</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.description}}</mat-cell>
                </ng-container>

                <!-- Details Column -->
                <ng-container matColumnDef="details">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Detalles</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button color="accent" [routerLink]="['/admin','exercise', 'details', row.id]" routerLinkActive="active">
                      <mat-icon>visibility</mat-icon>
                    </a>
                  </mat-cell>
                </ng-container>

                <!-- Edit Column -->
                <ng-container matColumnDef="edit">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Editar</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button color="primary" [routerLink]="['/admin','exercise', 'update', row.id]" routerLinkActive="active">
                      <mat-icon>mode_edit</mat-icon>
                    </a>
                  </mat-cell>
                </ng-container>

                <!-- delete Column -->
                <ng-container matColumnDef="delete">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Eliminar</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button (click)="onDelete(row)" color="warn"><mat-icon>delete_forever</mat-icon></a>
                  </mat-cell>
                </ng-container>

                <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
                <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
              </mat-table>

              <div class="table-footer" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="start center">
                <div  fxFlex="10%">
                  <button  mat-raised-button color="warn" (click)="onDeleteSelected($event)"
                  [disabled]="this.selection.selected.length < 1">
                    <mat-icon>delete_forever</mat-icon>
                    <span>Todos</span>
                  </button>
                </div>
                <div fxFlex="90%">
                  <div [hidden]="dataSource.data.length <= 50">
                    <mat-paginator #paginator [length]="dataSource.data.length"
                    [pageIndex]="0" [pageSize]="50" [pageSizeOptions]="[50, 100, 200]" showFirstLastButtons>
                    </mat-paginator>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .full-width{
      width: 100%;
    }

    .container {
      height: auto;
      min-height auto;
    }

  `]
})
export class ExerciseListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Exercise>;

  selection = new SelectionModel<Exercise>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'code', 'level', 'scale', 'description', 'details', 'edit', 'delete'];

  loading: boolean;
  private querySubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loading = true;

    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: exerciseList
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          this.loading = loading;

          if (data) {
            this.dataSource.data = data.exercises;
          }
        },
        error => {
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  onDelete(exercise: Exercise): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `¿Está seguro que desea eliminar el ejercicio "${exercise.code}"?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.apollo.mutate({
          mutation: deleteExercise,
          variables: {
            where: {
              id: exercise.id
            }
          }
        }).subscribe(( {data} ) => {
          this.loading = false;

          if (data) {
            this.dataSource.data = this.dataSource.data.filter(exercises => exercises.id !== exercise.id);
            this.snackBar.open(`Ejercicio ${data.deleteExercise.code} eliminado correctamente`, 'X', {duration: 3000});
          }
        }, (error) => {
          this.loading = false;
          this.snackBar.open(error, 'X', {duration: 3000});
        });

      }
    });
  }

  onDeleteSelected($event): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `¿Está seguro que desea eliminar los ${this.selection.selected.length} ejercicios selecionados?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.apollo.mutate({
          mutation: deleteManyExercises,
          variables: {
            where: {
              id_in: this.selection.selected.map(data => data.id)
            }
          }
        }).subscribe(( {data} ) => {
          this.loading = false;

          if (data) {
            this.dataSource.data = this.dataSource.data.filter(exercise => !this._exerciseExist(exercise, this.selection.selected));
            this.selection.clear();
            this.snackBar.open(`Los ${data.deleteManyExercises.count} ejercicios fueron eliminados correctamente`, 'X', {duration: 3000});
          }
        }, (error) => {
          this.loading = false;
          this.snackBar.open(error, 'X', {duration: 3000});
        });

      }
    });
  }

  private _exerciseExist(exercise: Exercise, exercises: any): boolean {
    if (exercises.some(data => (data.id === exercise.id))) {
      return true;
    }
    return false;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
