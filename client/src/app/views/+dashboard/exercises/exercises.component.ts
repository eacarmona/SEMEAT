import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Exercise } from '@app/core/model/exercise.model';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';


const exerciseQuery = gql`
  query exercises {
    exercises(where: {level_not: NINGUNO}) {
      level
      id
      description
    }
  }
`;

@Component({
  selector: 'app-exercises',
  template: `
    <div class="table-container mat-elevation-z8">
      <mat-form-field class="full-width">
        <mat-icon matPrefix>search</mat-icon>
        <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filtrado por código, nivel de atención o descripción">
      </mat-form-field>
      <table mat-table [dataSource]="dataSource">

        <!-- Level Column -->
        <ng-container matColumnDef="level">
          <th mat-header-cell *matHeaderCellDef> Nivel de atención </th>
          <td mat-cell *matCellDef="let element"> {{element.level}} </td>
        </ng-container>

        <!-- Description Column -->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef> Descripción </th>
          <td mat-cell *matCellDef="let element"> {{element.description}} </td>
        </ng-container>

        <!-- Basic Column -->
        <ng-container matColumnDef="basic">
          <th class="header-level" mat-header-cell *matHeaderCellDef> Básico </th>
          <td mat-cell *matCellDef="let element">
            <a class="level" mat-button matTooltip="Nivel de dificultad"
                    [routerLink]="['/student', 'exercise_viewer', element.id, 'basic']">
              <mat-icon color="accent">start</mat-icon>
            </a>
          </td>
        </ng-container>

        <!-- Half Column -->
        <ng-container matColumnDef="half">
          <th class="header-level" mat-header-cell *matHeaderCellDef> Medio </th>
          <td mat-cell *matCellDef="let element">
            <a class="level" mat-button matTooltip="Nivel de dificultad"
                [routerLink]="['/student', 'exercise_viewer', element.id, 'half']">
              <mat-icon color="primary">start</mat-icon>
              <mat-icon color="primary">start</mat-icon>
            </a>
          </td>
        </ng-container>

        <!-- Advanced Column -->
        <ng-container matColumnDef="advanced">
          <th class="header-level" mat-header-cell *matHeaderCellDef> Avanzado </th>
          <td mat-cell *matCellDef="let element">
            <a class="level" mat-button matTooltip="Nivel de dificultad"
                [routerLink]="['/student', 'exercise_viewer', element.id, 'advanced']">
              <mat-icon>start</mat-icon>
              <mat-icon>start</mat-icon>
              <mat-icon>start</mat-icon>
            </a>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator [pageSizeOptions]="[10, 15, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    table {
      width: 100%;
    }

    th.header-level {
      text-align: center;
    }

    .table-container {
      height: 430px;
      width: 100%;
      overflow: auto;
    }

    .level:hover {
      cursor: pointer;
    }

    .full-width {
      width: 100%;
    }

  `]
})
export class ExercisesComponent implements OnInit, OnDestroy, AfterViewInit {

  exerciseQuerySubcription: Subscription;

  dataSource: MatTableDataSource<Exercise>;
  displayedColumns: string[] = ['level', 'description', 'basic', 'half', 'advanced'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.exerciseQuerySubcription = this.apollo
          .watchQuery<any>({
            query: exerciseQuery,
          })
          .valueChanges.subscribe(
            ({ data, loading }) => {
              if (!loading) {
                const datas: Exercise[] = data.exercises;

                this.dataSource.data = [
                  ...datas.filter(d => d.level === 'ENFOCADA'),
                  ...datas.filter(d => d.level === 'SOSTENIDA'),
                  ...datas.filter(d => d.level === 'SELECTIVA'),
                  ...datas.filter(d => d.level === 'ALTERNADA'),
                  ...datas.filter(d => d.level === 'DIVIDIDA'),
                ];
              }
            },
            (error) => {
              this.snackBar.open(error.message, 'X', {
                duration: 3000
              });
            }
          );
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(): void {
    if (this.exerciseQuerySubcription) {
      this.exerciseQuerySubcription.unsubscribe();
    }
  }

}
