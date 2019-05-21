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
import { Test } from '@app/core/model/test.model';
import { TestAddComponent } from '../add/test-add.component';

const testList = gql`
  query tests {
    tests {
      id
      type
      description
      enable
      sections {
        id
        name
        description
      }
    }
  }
`;

const deleteTest = gql`
  mutation deleteTest($where: TestWhereUniqueInput!) {
    deleteTest(where: $where) {
      type
    }
  }
`;

const deleteManyTests = gql`
  mutation deleteManyTests($where: TestWhereInput!) {
    deleteManyTests(where: $where) {
      count
    }
  }
`;

@Component({
  selector: 'app-test-list',
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
          <button class="create-button" mat-raised-button color="primary" routerLink="/admin/test/create" routerLinkActive="active">
            <mat-icon>add</mat-icon>
            <span>Cuestionario</span>
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
                <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filtrado por habilitado, tipo y descripción">
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

                <!-- Type Column -->
                <ng-container matColumnDef="type">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Tipo</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.type}}</mat-cell>
                </ng-container>

                <!-- Enable Column -->
                <ng-container matColumnDef="enable">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Habilitado</mat-header-cell>
                  <mat-cell *matCellDef="let row">
                    <mat-icon *ngIf="row.enable" color="primary">done</mat-icon>
                    <mat-icon *ngIf="!row.enable" color="warn">close</mat-icon>
                  </mat-cell>
                </ng-container>

                <!-- Description Column -->
                <ng-container matColumnDef="description">
                  <mat-header-cell *matHeaderCellDef mat-sort-header>Descripción</mat-header-cell>
                  <mat-cell *matCellDef="let row">{{row.description}}</mat-cell>
                </ng-container>

                <!-- Add Column -->
                <ng-container matColumnDef="add">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Adicionar</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button matTooltip="Adicionar sección"
                    aria-label="Add section" (click)="openDialog(row)">
                      <mat-icon>reorder</mat-icon>
                    </a>
                  </mat-cell>
                </ng-container>

                <!-- Details Column -->
                <ng-container matColumnDef="details">
                  <mat-header-cell fxFlex="7" *matHeaderCellDef>
                    <span>Detalles</span>
                  </mat-header-cell>
                  <mat-cell fxFlex="7" *matCellDef="let row">
                    <a mat-icon-button color="accent" [routerLink]="['/admin','test', 'details', row.id]" routerLinkActive="active">
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
                    <a mat-icon-button color="primary" [routerLink]="['/admin','test', 'update', row.id]" routerLinkActive="active">
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
export class TestListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Test>;

  selection = new SelectionModel<Test>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'type', 'enable', 'description', 'add', 'details', 'edit', 'delete'];

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
        query: testList
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          this.loading = loading;

          if (data) {
            this.dataSource.data = data.tests;
          }
        },
        error => {
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }



  openDialog(section: Test): void {
    const dialogRef = this.dialog.open(TestAddComponent, {
      width: '90%',
      data: section
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
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

  onDelete(test: Test): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `¿Está seguro que desea eliminar el cuestionario "${test.type}"?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.apollo.mutate({
          mutation: deleteTest,
          variables: {
            where: {
              id: test.id
            }
          }
        }).subscribe(( {data} ) => {
          this.loading = false;

          if (data) {
            this.dataSource.data = this.dataSource.data.filter(tests => tests.id !== test.id);
            this.snackBar.open(`Cuestionario ${data.deleteTest.type} eliminado correctamente`, 'X', {duration: 3000});
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
        message: `¿Está seguro que desea eliminar los ${this.selection.selected.length} cuestionarios selecionados?`,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.apollo.mutate({
          mutation: deleteManyTests,
          variables: {
            where: {
              id_in: this.selection.selected.map(data => data.id)
            }
          }
        }).subscribe(( {data} ) => {
          this.loading = false;

          if (data) {
            this.dataSource.data = this.dataSource.data.filter(test => !this._testExist(test, this.selection.selected));
            this.selection.clear();
            this.snackBar.open(`Los ${data.deleteManyTests.count} cuestionarios fueron eliminados correctamente`, 'X', {duration: 3000});
          }
        }, (error) => {
          this.loading = false;
          this.snackBar.open(error, 'X', {duration: 3000});
        });

      }
    });
  }

  private _testExist(test: Test, tests: any): boolean {
    if (tests.some(data => (data.id === test.id))) {
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
