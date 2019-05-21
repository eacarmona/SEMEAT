import { Component, ElementRef, ViewChild, Input, AfterViewInit, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ExerciseData } from '@app/core/model/exerciseData.model';

@Component({
  selector: 'app-chart-exercise',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div class="item" fxFlex="80%" fxFlex.xs="100%" fxFlex.gt-sm="80%">
        <mat-card class="card">
          <mat-card-header>
            <mat-card-title>
              <h2 class="mat-h2">
                Ejercicios
              </h2>
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas #chart></canvas>
          </mat-card-content>
          <mat-card-actions>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: []
})
export class ChartExerciseComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') Chart: ElementRef;
  @Input() exercises: ExerciseData[];

  error = 0;
  omit = 0;
  fault = 0;
  point = 0;
  totalPoints = 0;
  score = 0;
  hit = 0;

  level = 0;

  constructor() { }

  ngOnInit() {

    this.error = this.exercises.map(p => p.error).reduce((prev, value) => prev + value, 0);

    this.omit = this.exercises.map(p => p.omit).reduce((prev, value) => prev + value, 0);
    this.hit = this.exercises.map(p => p.hit).reduce((prev, value) => prev + value, 0);

    this.totalPoints = (this.omit + this.hit) * 2;
    this.point = this.exercises.map(p => p.point).reduce((prev, value) => prev + value, 0);

    this.score = this.exercises.map(p => p.score).reduce((prev, value) => prev + value, 0);

    this.level = Math.round(this.score / this.exercises.length);

  }

  ngAfterViewInit(): void {
    const ctx = this.Chart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Errores', 'Aciertos', 'Puntos', 'Puntos posibles'],
        datasets: [
          {
            label: 'Métricas',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#5caa4a', '#3e95cd', '#s2c6b9'],
            data: [this.error, this.hit, this.point, this.totalPoints, 0]
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Métricas ejercicios'
        }
      }
    });
  }

}
