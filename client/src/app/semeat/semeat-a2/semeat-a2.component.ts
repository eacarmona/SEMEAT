import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';

@Component({
  selector: 'app-semeat-a2',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div fxFlex="90%" fxFlex.xs="98%" fxFlex.gt-sm="90%">

        <h3 mat-h3>Dígitos en regresión</h3>

        <span>Se mostrarán varias series de números, repíta cada serie en orden regresivo.
         Por ejemplo, si se muestra 6-9 usted escribe 9-6.
         <button mat-mini-fab color="accent" [disabled]="flagStart" (click)="start()"><mat-icon>alarm</mat-icon></button>
        </span>

        <h2 [@state]="state" mat-h2 [hidden]="flagQuestion">{{question}}</h2>

        <form [formGroup]="exerciseForm" #f="ngForm" (ngSubmit)="saveForm()">

          <div class="item" [@state]="state" [hidden]="!flagQuestion || !flagStart">
            <mat-form-field class="half-width">
              <input matInput type="text" placeholder="Introduce la serie en orden regresivo" formControlName="response">
            </mat-form-field>
            <div class="button">
              <button mat-raised-button color="primary" type="submit" aria-label="done">
                <span>Evaluar</span>
                <mat-icon>trending_flat</mat-icon>
              </button>
            </div>
          </div>
        </form>
        <div class="button" [hidden]="flagFinish">
          <button mat-raised-button color="accent" [disabled]="!exerciseForm.valid"
              (click)="saveExercise()" type="button" aria-label="done">
            <mat-icon>done</mat-icon>
            <span>Hecho</span>
          </button>
        </div>
      </div>
    </div>

  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
      .half-width {
        width: 100%;
      }
    `
  ],
  animations: [
    trigger('state', [
      state('inactive', style({transform: 'translateX(0) scale(0.9)'})),
      state('active',   style({transform: 'translateX(0) scale(1.0)'})),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
      transition('void => inactive', [
        style({transform: 'translateX(-100%) scale(1)'}),
        animate(100)
      ]),
      transition('inactive => void', [
        animate(100, style({transform: 'translateX(100%) scale(1)'}))
      ]),
      transition('void => active', [
        style({transform: 'translateX(0) scale(0)'}),
        animate(200)
      ]),
      transition('active => void', [
        animate(200, style({transform: 'translateX(0) scale(0)'}))
      ])
    ]
  )]
})
export class SemeatA2Component implements OnInit {
  exerciseForm: FormGroup;
  @Output()save = new EventEmitter();
  @Input() exercise: Exercise;
  @Input() user: User;

  initAt: Date;

  question: string;
  state = 'active';

  flagStart = false;
  flagFinish = true;
  flagQuestion = true;

  series = 0;
  count = 0;
  hit = 0;
  score = 0;
  fault = 0;
  omit = 5;

  result: any;
  create: any[] = [];

  data: any = [
    [
      {
        question: '2-4',
        response: '4-2'
      },
      {
        question: '3-9-5',
        response: '5-9-3'
      },
      {
        question: '1-3-6-9',
        response: '9-6-3-1'
      },
      {
        question: '3-8-1-5-9',
        response: '9-5-1-8-3'
      },
      {
        question: '2-4-8-9-1-6',
        response: '6-1-9-8-4-2'
      }
    ],
    [
      {
        question: '3-9',
        response: '9-3'
      },
      {
        question: '1-9-0',
        response: '0-9-1'
      },
      {
        question: '2-5-7-9',
        response: '9-7-5-2'
      },
      {
        question: '1-7-0-2-4',
        response: '4-2-0-7-1'
      },
      {
        question: '9-4-2-8-7-1',
        response: '1-7-8-2-4-9'
      }
    ]
  ];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      response: ['']
    });
  }

  start(): void {
    this.flagStart = true;
    this.flagQuestion = false;
    this.initAt = new Date();

    this.question = this.data[this.series][this.count].question;
    this.setState();

    setTimeout(() => {
      this.setState();
      this.flagQuestion = true;
    }, (this.count + 2) * 1000);
  }

  setState(): void {
    this.state = (this.state !== 'active') ? 'active' : 'inactive';
  }

  saveForm(): void {
    if (this.exerciseForm.valid) {
      let response = this.exerciseForm.value.response;

      if (response === this.data[this.series][this.count].response) {
        this.count += 1;
        this.hit += 1;
        this.omit -= 1;

      } else {
        this.fault += 1;
        this.series += 1;
        response = '';
      }

      this.create.push({
        question: this.question,
        response: response
      });

      if (this.series > 1 || this.count >= 5) {
        this.flagQuestion = false;
        this.question = 'Se ha terminado este ejercicio';
        this.flagFinish = false;
      } else {
        this.question = this.data[this.series][this.count].question;
        this.flagQuestion = false;

        this.setState();

        setTimeout(() => {
          this.setState();
          this.flagQuestion = true;
        }, (this.count + 2) * 1000);
      }
      this.exerciseForm.reset();
    }
  }

  saveExercise(): void {

    let point = (this.hit * 2) - (this.fault / 2 + this.omit / 2);
    const totalPoints = 10;

    if (point < 0) {
      point = 0;
    }

    this.result = {
      result: {
        create: this.create
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
