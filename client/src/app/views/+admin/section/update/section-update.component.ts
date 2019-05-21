import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Section } from '@app/core/model/section.model';

const updateSection = gql`
  mutation updateSection($data: SectionUpdateInput!, $where: SectionWhereUniqueInput!) {
    updateSection(data: $data, where: $where) {
      id
      name
      description
    }
  }
`;

const sectionQuery = gql`
  query section($id: String!) {
    section(id: $id) {
      id
      name
      enable
      description
      exercises {
        code
        description
      }
    }
  }
`;


@Component({
  selector: 'app-section-update',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <form [formGroup]="updateSectionForm" #f="ngForm" (ngSubmit)="onUpdateSection()" class="form">
            <mat-card class="section-card">
              <mat-card-header>
                <mat-card-title>
                  <h1>Modificar Sección</h1>
                </mat-card-title>
              </mat-card-header>

              <mat-card-content>

                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Nombre de la sección" formControlName="name">
                </mat-form-field>

                <mat-form-field class="full-width">
                  <textarea matInput type="text" placeholder="Describe la sección" formControlName="description"></textarea>
                </mat-form-field>

                <div class="full-width">
                  <mat-checkbox formControlName="enable">Habilitar</mat-checkbox>
                </div>

              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!updateSectionForm.valid" aria-label="updateSection">
                  <mat-icon>mode_edit</mat-icon>
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
  styles: [
    `
      .full-width {
        width: 100%;
      }
    `
  ]
})
export class SectionUpdateComponent implements OnInit, OnDestroy {
  updateSectionForm: FormGroup;
  sectionData: Section;
  sectionId: string;
  loading = false;
  sectionQuerySubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.updateSectionForm = this.formBuilder.group({
      name: ['', Validators.required],
      enable: [''],
      description: ['']
    });

    this.sectionId = this.activatedRoute.snapshot.params['id'];

    this.loading = true;
    this.updateSectionForm.disable();

    this.sectionQuerySubscription = this.apollo
      .watchQuery<any>({
        query: sectionQuery,
        variables: {
          id: this.sectionId
        }
      })
      .valueChanges.subscribe(({ data, loading }) => {
        if (!loading) {
          this.sectionData = data.section;
          this.updateSectionForm.enable();
          this.loading = false;

          this.updateSectionForm.patchValue({
            name: this.sectionData.name,
            enable: this.sectionData.enable,
            description: this.sectionData.description
          });
        }
      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });
  }

  onUpdateSection() {
    this.loading = true;

    if (this.updateSectionForm.valid) {
      this.updateSectionForm.disable();

      this.apollo
        .mutate({
          mutation: updateSection,
          variables: {
            data:  {
              'name': this.updateSectionForm.value.name,
              'description': this.updateSectionForm.value.description,
              'enable': this.updateSectionForm.value.enable,
            },
            where : {
              id: this.sectionId
            }
          }
        })
        .subscribe(
          ({ data }) => {
            this.loading = false;
            this.updateSectionForm.enable();

            if (data) {
              this.snackBar.open(
                `Section ${
                  data.updateSection.name
                } editado correctamente`,
                'X',
                { duration: 3000 }
              );
              this.router.navigate(['admin', 'section']);
            }
          },
          (error) => {
            this.loading = false;
            this.updateSectionForm.enable();
            this.snackBar.open(error.graphQLErrors[0].message, 'X', { duration: 3000 });
          }
        );
    } else {
      console.log('Form not valid');
    }
  }

  ngOnDestroy(): void {
    this.sectionQuerySubscription.unsubscribe();
  }
}
