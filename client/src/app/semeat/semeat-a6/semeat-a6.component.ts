import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';
import { ActivatedRoute } from '@angular/router';

interface IQuestion {
  value: number;
  class: string;
}

@Component({
  selector: 'app-semeat-a6',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div fxFlex="98%" fxFlex.xs="100%" fxFlex.gt-sm="99%">

        <div [@state]="state" [ngSwitch]="question.class">
          <h3>
            Presione todos los números iguales a <span [class]="question.class">({{question.value}})</span> y de tamaño
            <span *ngSwitchCase="'small'">
              pequeño.
            </span>
            <span *ngSwitchCase="'big'">
              grande.
            </span>
            <span *ngSwitchCase="'big_small'">
              pequeño y grande.
            </span>
          </h3>

        </div>

        <br />

        <form [formGroup]="exerciseForm" #f="ngForm" (ngSubmit)="saveForm()">

          <input formControlName="flagFormControl" type="hidden">

          <div class="buttons" [@state]="state">
            <mat-grid-list [cols]="this.grid" rowHeight="3:1">
              <mat-grid-tile *ngFor="let data of datas">
                <button hideButton mat-raised-button type="button" [disabled]="flagFinish" (click)="validQuestion(data)">
                    <span [class]="data.class">{{data.value}}</span>
                </button>
              </mat-grid-tile>
            </mat-grid-list>
            <br />
            <div class="button">
              <button mat-raised-button color="accent" [disabled]="!exerciseForm.valid"
                  type="submit" aria-label="done">
                <mat-icon>done</mat-icon>
                <span>Hecho</span>
              </button>
            </div>
          </div>
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
      .big {
        font-size: 35px;
      }
      .small {
        font-size: 15px;
      }
      .big_small {
        font-size: 20px;
      }
      .smaller {
        font-size: 0.1px;
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
        animate(400, style({transform: 'translateX(100%) scale(1)'}))
      ]),
      transition('void => active', [
        style({transform: 'translateX(0) scale(0)'}),
        animate(800)
      ]),
      transition('active => void', [
        animate(800, style({transform: 'translateX(0) scale(0)'}))
      ])
    ]
  )]
})
export class SemeatA6Component implements OnInit {

  @Output() save = new EventEmitter();
  @Input() user: User;
  @Input() exercise: Exercise;

  exerciseForm: FormGroup;
  initAt: Date;

  hit = 0;
  score = 0;
  fault = 0;
  omit = 0;

  result: any;
  response: string[] = [];
  state = 'active';

  questions: IQuestion[] = [
    {
      value: 1,
      class: 'small',
    },
    {
      value: 1,
      class: 'big',
    },
    {
      value: 2,
      class: 'small',
    },
    {
      value: 2,
      class: 'big',
    },
    {
      value: 3,
      class: 'small',
    },
    {
      value: 3,
      class: 'big',
    },
    {
      value: 4,
      class: 'smaller',
    },
    {
      value: 1,
      class: 'big_small',
    },
    {
      value: 2,
      class: 'big_small',
    },
    {
      value: 3,
      class: 'big_small',
    },
  ];

  question: IQuestion;
  datas: IQuestion[] = [];

  grid = 10;
  dificulty = 'INICIAL';
  flagFinish = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    ) {
    this.initAt = new Date();
  }

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      flagFormControl: ['']
    });

    this.question = this.questions[Math.round(Math.random() * (this.questions.length - 1))];

    while (this.question.value === 4) {
      this.question = this.questions[Math.round(Math.random() * (this.questions.length - 1))];
    }

    const dificulty =  this.activatedRoute.snapshot.params['dificulty'];

    if (dificulty === 'advanced') {
      this.grid = 20;
      this.dificulty = 'AVANZADA';
    } else if (dificulty === 'half') {
      this.grid = 15;
      this.dificulty = 'MEDIA';
    } else {
      this.grid = 10;
      this.dificulty = 'INICIAL';
    }

    for (let i = 0; i < Math.pow(this.grid, 2); i++) {
      const question = this.questions[Math.round(Math.random() * (this.questions.length - 4))];

      if (question.value === this.question.value && this.question.class.includes(question.class)) {
        this.omit += 1;
      }
      this.datas.push(question);
    }
  }

  saveForm(): void {
    if (this.exerciseForm.valid) {

      let point = (this.hit * 2) - (this.fault / 2 + this.omit / 2);
      const totalPoints = (this.hit + this.omit) * 2;

      if (point < 0) {
        point = 0;
      }

      this.result = {
        result: {
          create: {
            question: `${this.question.value.toString()}-${this.question.class}`,
            response: this.response.toString()
          }
        },
        initAt: this.initAt,
        finalAt: new Date(),
        dificulty: this.dificulty,
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
      this.flagFinish = true;
      this.exerciseForm.disable();
      this.save.emit(this.result);
    }
  }

  validQuestion(response: IQuestion): void {

    if (response.value === this.question.value && this.question.class.includes(response.class)) {
      this.omit -= 1;
      this.hit += 1;
    } else {
      this.fault += 1;
    }

    this.response.push(`${response.value.toString()}-${response.class}`);
  }
}
