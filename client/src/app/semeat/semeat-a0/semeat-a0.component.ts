import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';

@Component({
  selector: 'app-semeat-a0',
  template: `
  <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
    <div fxFlex="60%" fxFlex.xs="98%" fxFlex.gt-sm="80%">

        <form [formGroup]="generalDataForm" #f="ngForm" (ngSubmit)="saveForm()">

          <mat-form-field class="full-width">
              <mat-select placeholder="¿Sexo?" formControlName="sex">
                  <mat-option *ngFor="let sex of sexs" [value]="sex">{{sex}}</mat-option>
              </mat-select>
          </mat-form-field>

          <mat-form-field class="full-width">
              <mat-select placeholder="¿Qué mano usas frecuentemente?" formControlName="lateral">
                  <mat-option *ngFor="let l of lateral" [value]="l">{{l}}</mat-option>
              </mat-select>
          </mat-form-field>

          <mat-form-field class="full-width">
              <mat-select placeholder="¿Grado Escolar?" formControlName="scholarGrade">
                  <mat-option *ngFor="let grade of scholarGrade" [value]="grade">{{grade}}</mat-option>
              </mat-select>
          </mat-form-field>

          <mat-form-field class="full-width">
              <input type="text" required matInput placeholder="¿En donde trabajas?" formControlName="job">
          </mat-form-field>

          <mat-form-field class="full-width">
              <mat-select placeholder="¿Usted padece alguna enfermedad?" formControlName="desease" multiple>
                  <mat-option *ngFor="let desease of deseases" [value]="desease">{{desease}}</mat-option>
              </mat-select>
          </mat-form-field>

          <div class="button-action">
            <button mat-raised-button color="accent" type="submit" [disabled]="!generalDataForm.valid" aria-label="add">
              <mat-icon>done</mat-icon>
              <span>Hecho</span>
            </button>
          </div>
      </form>
    </div>
  </div>

  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `]
})
export class SemeatA0Component implements OnInit {

  sexs = ['Masculino', 'Femenino'];
  lateral = ['Derecha', 'Izquierda', 'Ambas'];
  scholarGrade = ['Cero escolaridad', 'Primaria', 'Bachillerato', 'Preparatoria', 'Universitario', 'Posgrado'];

  deseases = ['Hipertensión Arterial', 'Enfermedades pulmonares',
             'Alcholismo', 'Farmacodependencia', 'Disminución de agudeza visual o auditiva',
             'Traumatismos craneoencefálicos', 'Diabetes',
             'Tiroidismo', 'Accidentes cerebrovasculares',
             'Otras'];

  generalDataForm: FormGroup;
  result: any;
  @Output() save = new EventEmitter();
  @Input() user: User;
  @Input() exercise: Exercise;

  initAt: Date;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.generalDataForm = this.formBuilder.group({
      sex: ['', Validators.required],
      lateral: ['', Validators.required],
      scholarGrade: ['', Validators.required],
      job: ['', Validators.required],
      desease: [''],
    });

    this.initAt = new Date();
  }

  saveForm(): void {

    if (this.generalDataForm.valid) {

      this.result = {
        result: {
          create: [
            {
              question: '¿Sexo?',
              response: this.generalDataForm.value.sex
            },
            {
              question: '¿Qué mano usas frecuentemente?',
              response: this.generalDataForm.value.lateral
            },
            {
              question: '¿En donde trabajas?',
              response: this.generalDataForm.value.job
            },
            {
              question: '¿Grado Escolar?',
              response: this.generalDataForm.value.scholarGrade
            },
            {
              question: '¿Usted padece alguna enfermedad?',
              response: (this.generalDataForm.value.desease).toString()
            }
          ],
        },
        initAt: this.initAt,
        finalAt: new Date(),
        createdBy: {
          connect: {
            id: this.user.id
          }
        },
        exercise: {
          connect: {
            id: this.exercise.id
          }
        },
        score: this.exercise.scale
    };
      this.snackBar.open('Ejercicio terminado correctamente', 'X', {duration: 3000});
      this.generalDataForm.disable();
    }
    this.save.emit(this.result);
  }

}
