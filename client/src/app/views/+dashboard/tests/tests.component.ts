import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { Test } from '@app/core/model/test.model';


const testQuery = gql`
  query tests {
    tests(where: {type_not: INICIAL, enable: true}) {
      id
      description
      type
    }
  }
`;

@Component({
  selector: 'app-tests',
  template: `
    <div class="table-container mat-elevation-z8">
      <mat-form-field class="full-width">
        <mat-icon matPrefix>search</mat-icon>
        <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filtrado por nivel de atención o descripción">
      </mat-form-field>
      <table mat-table [dataSource]="dataSource">

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef> Tipo de Cuestionario </th>
          <td mat-cell *matCellDef="let element"> {{element.type}} </td>
        </ng-container>

        <!-- Description Column -->
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef> Descripción </th>
          <td mat-cell *matCellDef="let element"> {{element.description}} </td>
        </ng-container>

        <!-- Link Column -->
        <ng-container matColumnDef="link">
          <th class="header-level" mat-header-cell *matHeaderCellDef> Cuestionario </th>
          <td mat-cell *matCellDef="let element">
            <a class="level" mat-button [matTooltip]="element.description"
                [routerLink]="['/student', 'test_viewer', element.id]">
              <mat-icon>link</mat-icon>
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
export class TestsComponent implements OnInit, OnDestroy, AfterViewInit {

  exerciseQuerySubcription: Subscription;

  dataSource: MatTableDataSource<Test>;
  displayedColumns: string[] = ['type', 'description', 'link'];

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
            query: testQuery,
          })
          .valueChanges.subscribe(
            ({ data, loading }) => {
              if (!loading) {
                this.dataSource.data = data.tests;
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

