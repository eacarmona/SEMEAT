import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { Section } from '@app/core/model/section.model';

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
  selector: 'app-section-details',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-card class="section-details-card">
            <mat-card-header>
              <mat-card-title>
                <h1>Detalles Sección</h1>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content>

              <div *ngIf="sectionData">

                <mat-grid-list cols="2" rowHeight="6:1">
                    <mat-grid-tile><h3>Id:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{sectionData.id}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Nombre:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{sectionData.name}}</h3></mat-grid-tile>
                    <mat-grid-tile><h3>Habilitado:</h3></mat-grid-tile>
                    <mat-grid-tile>
                      <mat-icon *ngIf="sectionData.enable" color="primary">done</mat-icon>
                      <mat-icon *ngIf="!sectionData.enable" color="warn">close</mat-icon>
                    </mat-grid-tile>
                    <mat-grid-tile><h3>Descripción:</h3></mat-grid-tile>
                    <mat-grid-tile><h3> {{sectionData.description}}</h3></mat-grid-tile>

                    <mat-grid-tile><h3>Ejercicios</h3></mat-grid-tile>

                </mat-grid-list>
                <mat-chip-list class="mat-chip-list-stacked">
                  <mat-chip *ngFor="let exercise of sectionData.exercises" selected color="undefined">
                    {{exercise.code}} | {{exercise.description}}
                  </mat-chip>
                </mat-chip-list>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="accent" routerLink="/admin/section" routerLinkActive type="button" aria-label="details">
                <mat-icon>list</mat-icon>
                <span>Listado de secciones</span>
              </button>
              <button *ngIf="sectionData" mat-raised-button color="primary" [routerLink]="['/admin','section', 'update', sectionData.id]"
               routerLinkActive="active">
                <mat-icon>mode_edit</mat-icon>
                <span>Editar</span>
              </button>
            </mat-card-actions>
          </mat-card>

        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }

      mat-chip.section {
        margin: 10px;
      }
    `
  ]
})
export class SectionDetailsComponent implements OnInit, OnDestroy {
  sectionData: Section;
  sectionId: string;
  loading = false;
  sectionQuerySubscription: Subscription;

  constructor(
    private activedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.sectionId = this.activedRoute.snapshot.params['id'];

    this.loading = true;

    this.sectionQuerySubscription = this.apollo
      .watchQuery<any>({
        query: sectionQuery,
        variables: {
          id: this.sectionId
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {
            this.sectionData = data.section;
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }

  ngOnDestroy(): void {
    this.sectionQuerySubscription.unsubscribe();
  }
}
