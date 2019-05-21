import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';
import { ActivatedRoute } from '@angular/router';

interface IQuestion {
  value: string;
  index?: number;
}

@Component({
  selector: 'app-semeat-ab',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div fxFlex="50%" fxFlex.xs="100%" fxFlex.gt-sm="99%">

        <div [@state]="state" [ngSwitch]="question">
          <h3>
            Precione los botones cuya flecha apunte hacia  <mat-icon>{{question}}</mat-icon>
          </h3>

        </div>

        <br />

        <form [formGroup]="exerciseForm" #f="ngForm" (ngSubmit)="saveForm()">

          <input formControlName="flagFormControl" type="hidden">

          <div class="buttons" [@state]="state">
            <mat-grid-list [cols]="this.grid" rowHeight="4:1" gutterSize="15px">
              <mat-grid-tile *ngFor="let data of datas">
                <button mat-raised-button type="button" [disabled]="flagFinish" (click)="validQuestion(data)">
                    <mat-icon>{{data.value}}</mat-icon>
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
        width: 50%;
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
export class SemeatAbComponent implements OnInit {

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
      value: 'arrow_forward',
    },
    {
      value: 'arrow_back',
    },
    {
      value: 'arrow_upward',
    },
    {
      value: 'arrow_downward',
    }
  ];

  @Input() question: any;
  datas: IQuestion[] = [];

  grid = 3;
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

    const dificulty =  this.activatedRoute.snapshot.params['dificulty'];

    if (dificulty === 'advanced') {
      this.grid = 7;
      this.dificulty = 'AVANZADA';
    } else if (dificulty === 'half') {
      this.grid = 5;
      this.dificulty = 'MEDIA';
    } else {
      this.grid = 3;
      this.dificulty = 'INICIAL';
    }

    for (let i = 0; i < Math.pow(this.grid, 2); i++) {
      const question = this.questions[Math.round(Math.random() * (this.questions.length - 1))];

      if (question.value === this.question) {
        this.omit += 1;
      }
      this.datas.push({
        value: question.value,
        index: i
      });
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
            question: `${this.question}`,
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

    if (this.response.find(r => r.includes(response.index.toString()))) {
      this.fault += 1;
    } else if (response.value === this.question) {
      this.omit -= 1;
      this.hit += 1;
    } else {
      this.fault += 1;
    }

    this.response.push(`${response.value}-${response.index}`);
  }
}

