import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import gql from 'graphql-tag';


const createTest = gql`
  mutation createTest($data: TestCreateInput!) {
    createTest(data: $data) {
      type
      description
    }
  }
`;

@Component({
  selector: 'app-test-create',
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
          <form [formGroup]="createTestForm" #f="ngForm" (ngSubmit)="onCreateTest()" class="form">
            <mat-card class="test-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Crear Cuestionario</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <mat-select placeholder="Tipo de cuestionario" formControlName="type">
                    <mat-option value="INICIAL">Cuestionario Inicial</mat-option>

                    <mat-option value="ENFOCADA">Atención Enfocada</mat-option>
                    <mat-option value="SOSTENIDA">Atención Sostenida</mat-option>
                    <mat-option value="SELECTIVA">Atención Selectiva</mat-option>
                    <mat-option value="ALTERNADA">Atención Alternada</mat-option>
                    <mat-option value="DIVIDIDA">Atención Dividida</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field class="full-width">
                  <textarea matInput placeholder="Describe el cuestionario" formControlName="description"></textarea>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!createTestForm.valid" aria-label="createTest">
                  <mat-icon>add</mat-icon>
                  <span>Cuestionario</span>
                </button>

                <button mat-raised-button color="accent" routerLink="/admin/test"
                   routerLinkActive type="button" aria-label="testsList">
                  <mat-icon>list</mat-icon>
                  <span>Listado de cuestionarios</span>
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
export class TestCreateComponent implements OnInit {

  createTestForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) { }

  ngOnInit() {

    this.createTestForm = this.formBuilder.group({
      type: ['', Validators.required],
      description: ['']
    });
  }

  onCreateTest(): void {

    this.loading = true;

    if (this.createTestForm.valid) {

      this.createTestForm.disable();
      this.apollo.mutate({
        mutation: createTest,
        variables: {
          data: {
            'type': this.createTestForm.value.type,
            'description': this.createTestForm.value.description,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.createTestForm.enable();

        if (data) {
          this.snackBar.open(`Cuestionario ${data.createTest.type} creado correctamente`, 'X', {duration: 3000});
          this.router.navigate(['admin', 'test']);
        }
      }, (error) => {
        this.loading = false;
        this.createTestForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
