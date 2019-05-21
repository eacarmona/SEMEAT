import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import gql from 'graphql-tag';


const createSection = gql`
  mutation createSection($data: SectionCreateInput!) {
    createSection(data: $data) {
      name
      description
    }
  }
`;

@Component({
  selector: 'app-section-create',
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
          <form [formGroup]="createSectionForm" #f="ngForm" (ngSubmit)="onCreateSection()" class="form">
            <mat-card class="section-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Crear Sección</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Nombre de la sección" formControlName="name">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <textarea matInput type="text" placeholder="Describe la sección" formControlName="description"></textarea>
                </mat-form-field>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!createSectionForm.valid" aria-label="createSection">
                  <mat-icon>add</mat-icon>
                  <span>Sección</span>
                </button>

                <button mat-raised-button color="accent" routerLink="/admin/section"
                   routerLinkActive type="button" aria-label="sectionsList">
                  <mat-icon>list</mat-icon>
                  <span>Listado de secciones</span>
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
export class SectionCreateComponent implements OnInit {

  createSectionForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) { }

  ngOnInit() {

    this.createSectionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onCreateSection(): void {

    this.loading = true;

    if (this.createSectionForm.valid) {

      this.createSectionForm.disable();
      this.apollo.mutate({
        mutation: createSection,
        variables: {
          data: {
            'name': this.createSectionForm.value.name,
            'description': this.createSectionForm.value.description,
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;
        this.createSectionForm.enable();

        if (data) {
          this.snackBar.open(`Sección ${data.createSection.name} creado correctamente`, 'X', {duration: 3000});
          this.router.navigate(['admin', 'section']);
        }
      }, (error) => {
        this.loading = false;
        this.createSectionForm.enable();
        this.snackBar.open(error, 'X', {duration: 3000});
      });

    } else {
      console.log('Form not valid');
    }
  }
}
