import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { User } from '@app/core/model/user.model';
import { MatSnackBar } from '@angular/material';
import { Exercise } from '@app/core/model/exercise.model';

@Component({
  selector: 'app-semeat-a5',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div fxFlex="90%" fxFlex.xs="98%" fxFlex.gt-sm="90%">

        <h3 mat-h3>Detección Visual</h3>

        <span>
           Marque las palabras que se mostraran por 5 segundos.
          <button mat-mini-fab color="accent" [disabled]="flagStart" (click)="start()"><mat-icon>alarm</mat-icon></button>
        </span>

        <h2 [@state]="state" mat-h2 [hidden]="flagQuestion">{{question.toString()}}</h2>

        <form [formGroup]="exerciseForm" #f="ngForm" (ngSubmit)="saveForm()">

          <div [@state]="state" class="questions" [hidden]="!flagQuestion || !flagStart">
            <mat-list>
              <mat-list-item *ngFor="let word of data" class="word">
                <mat-checkbox formControlName="word" (change)="onChange(word, $event)">{{word.name}}</mat-checkbox>
              </mat-list-item>
            </mat-list>
          </div>

          <br />
          <div class="button" [hidden]="!exerciseForm.valid || !flagQuestion || !flagStart || flagFinish">
            <button mat-raised-button color="primary" [disabled]="!exerciseForm.valid"
                type="submit" aria-label="done">
              <span>Evaluar</span>
              <mat-icon>trending_flat</mat-icon>
            </button>
          </div>
        </form>

        <div class="button" [hidden]="!flagFinish">
          <button mat-raised-button color="accent" [disabled]="!exerciseForm.valid"
            type="button" (click)="saveExercise()" aria-label="done">
            <mat-icon>done</mat-icon>
            <span>Guardar</span>
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
      .hide {
        display: none!important;
      }
      .word {
        width: 20%;
        float: left;
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
export class SemeatA5Component implements OnInit {
  exerciseForm: FormGroup;
  @Output() save = new EventEmitter();
  @Input() exercise: Exercise;
  @Input() user: User;
  initAt: Date;

  flagStart = false;
  flagFinish = false;
  flagNext = false;
  flagQuestion = true;

  hit = 0;
  score = 0;
  fault = 0;
  omit = 18;

  index = 1;
  question: string[];
  state = 'active';

  result: any;
  create: any[] = [];

  words: any[] = [
    {
      name: 'gato',
      value: 1,
    },
    {
      name: 'pera',
      value: 1,
    },
    {
      name: 'mano',
      value: 1,
    },
    {
      name: 'fresa',
      value: 1,
    },
    {
      name: 'vaca',
      value: 1,
    },
    {
      name: 'codo',
      value: 1,
    },
    {
      name: 'perro',
      value: 2,
    },
    {
      name: 'naranja',
      value: 2,
    },
    {
      name: 'boca',
      value: 2,
    },
    {
      name: 'mango',
      value: 2,
    },
    {
      name: 'pierna',
      value: 2,
    },
    {
      name: 'abeja',
      value: 2,
    },
    {
      name: 'caballo',
      value: 3,
    },
    {
      name: 'manzana',
      value: 3,
    },
    {
      name: 'ojo',
      value: 3,
    },
    {
      name: 'cebolla',
      value: 3,
    },
    {
      name: 'paloma',
      value: 3,
    },
    {
      name: 'árbol',
      value: 3,
    },
  ];

  data: any[];

  response: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    ) {
    this.initAt = new Date();
  }

  ngOnInit() {
    this.exerciseForm = this.formBuilder.group({
      word: ['', Validators.required],
    });

    this.question = this.words
                          .filter(p => p.value === this.index)
                          .map(p => p.name);

    this.data = this.words.sort();
  }

  onChange(word: any, $event) {
    if ($event.checked) {
      if (this.words.filter(p => (p.value === this.index && p.name === word.name)).length > 0) {
        this.hit += 1;
        this.omit -= 1;
      } else {
        this.fault += 1;
      }
      this.response.push(word.name);
    } else {
      if (this.words.filter(p => (p.value === this.index && p.name === word.name)).length > 0) {
        this.hit -= 1;
        this.omit += 1;
      } else {
        this.fault -= 1;
      }
      this.response = this.response.filter(w => w !== word.name);
    }
  }

  setState(): void {
    this.state = (this.state !== 'active') ? 'active' : 'inactive';
  }

  start(): void {
    this.flagStart = true;
    this.flagQuestion = false;
    this.setState();
    setTimeout(() => {
      this.setState();
      this.flagQuestion = true;
    }, 5000);
  }

  saveForm(): void {
    if (this.exerciseForm.valid) {

      this.create.push({
        question: this.question.toString(),
        response: this.response.toString()
      });

      this.index++;

      if (this.index > 3) {
        this.flagFinish = true;
        this.snackBar.open('Ha terminado este ejercicio.', 'X', {duration: 3000});
      } else {
        this.response = [];
        this.question = this.words
                    .filter(p => p.value === this.index)
                    .map(p => p.name);
        this.flagQuestion = false;
        this.setState();
        setTimeout(() => {
          this.setState();
          this.flagQuestion = true;
        }, 5000);

        this.exerciseForm.reset();
      }
    }
  }

  saveExercise(): void {

    let point = (this.hit * 2) - (this.fault / 2 + this.omit / 2);
    const totalPoints = (this.hit + this.omit) * 2;

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

    this.exerciseForm.reset();
    this.exerciseForm.disable();
    this.save.emit(this.result);
  }

}

