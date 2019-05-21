import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Test } from '@app/core/model/test.model';

const updateTest = gql`
  mutation updateTest($data: TestUpdateInput!, $where: TestWhereUniqueInput!) {
    updateTest(data: $data, where: $where) {
      id
      type
      description
    }
  }
`;

const testQuery = gql`
  query test($id: String!) {
    test(id: $id) {
      id
      type
      description
      enable
    }
  }
`;


@Component({
  selector: 'app-test-update',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayout.xs="column" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="98%">

        <div class="mat-elevation-z8">
          <form [formGroup]="updateTestForm" #f="ngForm" (ngSubmit)="onUpdateTest()" class="form">
            <mat-card class="test-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Modificar Cuestionario</h1>
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

                <div class="full-width">
                  <mat-checkbox formControlName="enable">Habilitar</mat-checkbox>
                </div>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!updateTestForm.valid" aria-label="updateTest">
                  <mat-icon>mode_edit</mat-icon>
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
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ]
})
export class TestUpdateComponent implements OnInit, OnDestroy {
  updateTestForm: FormGroup;
  testData: Test;
  testId: string;
  loading = false;
  testQuerySubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.updateTestForm = this.formBuilder.group({
      type: ['', Validators.required],
      description: [''],
      enable: []
    });

    this.testId = this.activatedRoute.snapshot.params['id'];

    this.loading = true;
    this.updateTestForm.disable();

    this.testQuerySubscription = this.apollo
      .watchQuery<any>({
        query: testQuery,
        variables: {
          id: this.testId
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          this.testData = data.test;
          this.updateTestForm.enable();
          this.loading = false;

          this.updateTestForm.patchValue({
            type: this.testData.type,
            description: this.testData.description,
            enable: this.testData.enable
          });
        }
      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });
  }

  onUpdateTest() {
    this.loading = true;

    if (this.updateTestForm.valid) {
      this.updateTestForm.disable();

      this.apollo
        .mutate({
          mutation: updateTest,
          variables: {
            data:  {
              'type': this.updateTestForm.value.type,
              'description': this.updateTestForm.value.description,
              'enable': this.updateTestForm.value.enable,
            },
            where : {
              id: this.testId
            }
          }
        })
        .subscribe(
          ({ data }) => {
            this.loading = false;
            this.updateTestForm.enable();

            if (data) {
              this.snackBar.open(
                `Cuestionario ${
                  data.updateTest.type
                } editado correctamente`,
                'X',
                { duration: 3000 }
              );
              this.router.navigate(['admin', 'test']);
            }
          },
          (error) => {
            this.loading = false;
            this.updateTestForm.enable();
            this.snackBar.open(error.graphQLErrors[0].message, 'X', { duration: 3000 });
          }
        );
    } else {
      console.log('Form not valid');
    }
  }

  ngOnDestroy(): void {
    this.testQuerySubscription.unsubscribe();
  }
}
