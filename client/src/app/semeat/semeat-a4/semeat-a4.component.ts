import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';

@Component({
  selector: 'app-semeat-a4',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div fxFlex="90%" fxFlex.xs="98%" fxFlex.gt-sm="90%">

        <h3 mat-h3>20-3</h3>

        <span>
          A 27 restále 3, y repita el proceso con el resultado, después de 5 iteraciones, terminar. Ejemplo respuesta: 24-21-18-15-12
        </span>

        <form [formGroup]="exerciseForm" #f="ngForm" (ngSubmit)="saveForm()">

          <mat-form-field class="full-width">
            <input matInput required type="text" placeholder="20-3" formControlName="response">
          </mat-form-field>

          <br />
          <button mat-raised-button color="accent" [disabled]="!exerciseForm.valid"
              type="submit" aria-label="done">
            <mat-icon>done</mat-icon>
            <span>Hecho</span>
          </button>
        </form>
      </div>
    </div>

  `,
  styles: [`
      .full-width {
        width: 100%;
      }
      .half-width {
        width: 100%;
      }
      .hide {
        display: none!important;
      }
    `
  ]
})
export class SemeatA4Component implements OnInit {
  exerciseForm: FormGroup;
  @Output() save = new EventEmitter();
  @Input() exercise: Exercise;
  @Input() user: User;
  initAt: Date;

  hit = 0;
  score = 0;
  fault = 0;
  omit = 5;

  result: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    ) {
    this.initAt = new Date();
  }

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      response: ['', Validators.required]
    });

  }

  saveForm(): void {
    if (this.exerciseForm.valid) {

      const response = this.exerciseForm.value.response;
      const numbers = response.split('-');

      let i = 1;

      for (const number of numbers) {
        if ((20 - (3 * i)).toString() === number) {
          this.hit += 1;
          if (this.omit > 0) {
            this.omit -= 1;
          }
        } else {
          if (this.omit > 0) {
            this.omit -= 1;
          }
          this.fault += 1;
        }

        if (i > 5) {
          break;
        }
        i++;
      }

      let point = (this.hit * 2) - (this.fault / 2 + this.omit / 2);
      const totalPoints = (this.hit + this.omit) * 2;

      if (point < 0) {
        point = 0;
      }

      this.result = {
        result: {
          create: {
            question: '20-3',
            response: response,
          }
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
        hit: this.hit,
        error: this.fault + this.omit,
        fault: this.fault,
        omit: this.omit,
        point: point,
        score: point * this.exercise.scale / totalPoints,
      };

      this.snackBar.open('Ejercicio terminado correctamente', 'X', {duration: 3000});

      this.exerciseForm.disable();
      this.save.emit(this.result);
    }
  }
}
