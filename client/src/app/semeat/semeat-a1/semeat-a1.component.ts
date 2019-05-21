import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';

@Component({
  selector: 'app-semeat-a1',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div fxFlex="60%" fxFlex.xs="98%" fxFlex.gt-sm="80%">

        <form [formGroup]="exerciseForm" #f="ngForm" (ngSubmit)="saveForm()">

          <mat-form-field class="full-width">
              <mat-select placeholder="¿Qué día es?" formControlName="day">
                  <mat-option *ngFor="let day of days" [value]="day.value">{{day.name}}</mat-option>
              </mat-select>
          </mat-form-field>

          <mat-form-field class="full-width">
              <mat-select placeholder="¿Qué mes es?" formControlName="month">
                  <mat-option *ngFor="let month of months" [value]="month.value">{{month.name}}</mat-option>
              </mat-select>
          </mat-form-field>

          <mat-form-field class="full-width">
              <input type="number" required matInput placeholder="¿Qué año es (2018)?" formControlName="year">
          </mat-form-field>

          <mat-form-field class="full-width">
              <input type="text" required matInput placeholder="¿En qué ciudad estás?" formControlName="city">
          </mat-form-field>

          <mat-form-field class="full-width">
              <input type="text" required matInput placeholder="¿En qué lugar estás?" formControlName="place">
          </mat-form-field>

          <mat-form-field class="full-width">
              <input type="number" required matInput placeholder="¿Cuántos años tiene usted?" formControlName="age">
          </mat-form-field>

          <div class="button-action">
            <button mat-raised-button color="accent" type="submit" [disabled]="!exerciseForm.valid" aria-label="add">
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
export class SemeatA1Component implements OnInit {

  days: any[] = [
    {
      name: 'Domingo',
      value: 0,
    },
    {
      name: 'Lunes',
      value: 1,
    },
    {
      name: 'Martes',
      value: 2,
    },
    {
      name: 'Miércoles',
      value: 3,
    },
    {
      name: 'Jueves',
      value: 4,
    },
    {
      name: 'Viernes',
      value: 5,
    },
    {
      name: 'Sábado',
      value: 6,
    }
  ];

  months: any[] = [
    {
      name: 'Enero',
      value: 0,
    },
    {
      name: 'Febrero',
      value: 1,
    },
    {
      name: 'Marzo',
      value: 2,
    },
    {
      name: 'Abril',
      value: 3,
    },
    {
      name: 'Mayo',
      value: 4,
    },
    {
      name: 'Junio',
      value: 5,
    },
    {
      name: 'Julio',
      value: 6,
    },
    {
      name: 'Agosto',
      value: 7,
    },
    {
      name: 'Septiembre',
      value: 8,
    },
    {
      name: 'Octubre',
      value: 9,
    },
    {
      name: 'Noviembre',
      value: 10,
    },
    {
      name: 'Diciembre',
      value: 11
    },
  ];

  exerciseForm: FormGroup;
  result: any;

  @Output() save = new EventEmitter();
  @Input() user: User;
  @Input() exercise: Exercise;

  initAt: Date;
  age = 0;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      city: ['', Validators.required],
      place: ['', Validators.required],
      age: ['', Validators.required]
    });

    this.initAt = new Date();
    this.age = parseInt(((new Date().getTime() - new Date(this.user.birthdate).getTime()) / (60000 * 60 * 24 * 365)).toString(), 10);
  }

  saveForm(): void {
    if (this.exerciseForm.valid) {

      const hit = ((Number)(new Date().getDay() === this.exerciseForm.value.day) +
                  (Number)(new Date().getMonth() === this.exerciseForm.value.month) +
                  (Number)(new Date().getFullYear() === this.exerciseForm.value.year) +
                  (Number)(this.age === this.exerciseForm.value.age));

      const error = ((Number)(new Date().getDay() !== this.exerciseForm.value.day) +
                    (Number)(new Date().getMonth() !== this.exerciseForm.value.month) +
                    (Number)(new Date().getFullYear() !== this.exerciseForm.value.year) +
                    (Number)(this.age !== this.exerciseForm.value.age));

      this.result = {
          result: {
            create: [
              {
                question: '¿Qué día es?',
                response: this.days[this.exerciseForm.value.day].name,
              },
              {
                question: '¿Qué mes es?',
                response: this.months[this.exerciseForm.value.month].name,
              },
              {
                question: '¿Qué año es?',
                response: this.exerciseForm.value.year,
              },
              {
                question: '¿En qué ciudad estás?',
                response: this.exerciseForm.value.city,
              },
              {
                question: '¿En qué lugar estás?',
                response: this.exerciseForm.value.place,
              },
              {
                question: '¿Cuántos años tiene usted?',
                response: this.exerciseForm.value.age,
              }

            ]
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
          hit: hit,
          omit: 4 - hit,
          point: (hit * 2) - error,
          score: ((hit * 2) - error) * this.exercise.scale / 8,
          error: error,
        };

      this.exerciseForm.disable();
      this.snackBar.open('Ejercicio terminado correctamente', 'X', {duration: 3000});
    }
    this.save.emit(this.result);
  }

}
