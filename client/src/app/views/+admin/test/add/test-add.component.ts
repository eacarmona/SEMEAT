import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { Test } from '@app/core/model/test.model';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';
import { Section } from '@app/core/model/section.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';

const sectionsQuery = gql`
  query sections($where: SectionWhereInput!) {
    sections(where: $where) {
      id
      name
      description
    }
  }
`;

const updateTestMutation = gql`
  mutation updateTest($where: TestWhereUniqueInput!, $data: TestUpdateInput!) {
    updateTest(where: $where, data: $data) {
      id
      sections {
        id
        name
        description
      }
    }
  }
`;

@Component({
  selector: 'app-test-add',
  template: `
  <div class="container">
    <mat-toolbar>
      <h2 mat-dialog-title>{{data.type}}</h2>
      <span class="spacer"></span>
      <button mat-icon-button color="warn" mat-dialog-close><mat-icon>close</mat-icon></button>
    </mat-toolbar>

    <form class="section-form" [formGroup]="addSectionForm" #f="ngForm" (ngSubmit)="onAddSection()">
      <div class="full-width">
        <mat-form-field class="half-width">
          <mat-select placeholder="Adicionar secciones a este cuestionario" formControlName="name">
            <mat-option *ngFor="let section of sections" [value]="section.name">
              <span>{{section.name}}</span> |
              <small>{{section.description}}</small>
            </mat-option>
          </mat-select>
        </mat-form-field>

        <span class="spacer"></span>
        <button mat-raised-button color="primary" type="submit"
        [disabled]="!addSectionForm.valid" aria-label="addSection">
          <mat-icon>add</mat-icon>
          <span>Sección</span>
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
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Código </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
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
                <a mat-icon-button (click)="onDelete(element.name)" color="warn"><mat-icon>delete_forever</mat-icon></a>
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
export class TestAddComponent implements OnInit, OnDestroy {

  displayedColumns = ['name', 'description', 'delete'];
  dataSource: Section[];
  loading = false;

  sectionsQuerySubcription: Subscription;
  sections: Section[] = [];

  addSectionForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Test,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.dataSource = data.sections;
  }

  ngOnInit() {

    this.addSectionForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.getSections();
  }

  getSections(): void {
    this.loading = true;
    this.addSectionForm.disable();
    this.sectionsQuerySubcription = this.apollo
      .watchQuery<any>({
        query: sectionsQuery,
        variables: {
          where: {
            'id_not_in': this.dataSource.map(section => section.id),
          }
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.loading = false;
            this.sections = data.sections;
            this.addSectionForm.enable();
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

  onAddSection(): void {
    this.loading = true;

    if (this.addSectionForm.valid) {

      this.addSectionForm.disable();
      this.apollo.mutate({
        mutation: updateTestMutation,
        variables: {
          where: {
            'id': this.data.id,
          },
          data: {
            'sections': {
              'connect': {
                'name': this.addSectionForm.value.name
              }
            }
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.addSectionForm.enable();
        if (data) {
          this.snackBar.open(`Se ha adicionado un nuevo ejercicio`, 'X', {duration: 3000});
          this.dataSource = data.updateTest.sections;
          this.getSections();
          this.addSectionForm.reset();
        }
      }, (error) => {
        this.loading = false;
        this.addSectionForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }

  onDelete(name: string): void {

    if (name) {
      this.apollo.mutate({
        mutation: updateTestMutation,
        variables: {
          where: {
            'id': this.data.id,
          },
          data: {
            'sections': {
              'disconnect': {
                'name': name
              }
            }
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.addSectionForm.enable();

        if (data) {
          this.snackBar.open(`Se ha eliminado un nuevo ejercicio`, 'X', {duration: 3000});
          this.dataSource = data.updateTest.sections;
          this.getSections();
        }
      }, (error) => {
        this.loading = false;
        this.addSectionForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });
    } else {
      this.snackBar.open(`Error no se encuentra ID`, 'X', {duration: 3000});
    }

  }

  ngOnDestroy(): void {
    this.sectionsQuerySubcription.unsubscribe();
  }

}
