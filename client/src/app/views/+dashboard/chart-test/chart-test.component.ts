import { Component, ElementRef, ViewChild, Input, AfterViewInit, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TestData } from '@app/core/model/testData.model';

@Component({
  selector: 'app-chart-test',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div class="item" fxFlex="80%" fxFlex.xs="100%" fxFlex.gt-sm="80%">
        <mat-card class="card">
          <mat-card-header >
            <mat-card-title [ngSwitch]="level.toString()">
                <h3 class="mat-h3">{{testData.createdBy.firstname}}

                  <span class="mat-span" *ngSwitchCase="0">
                      Se le recomienda realizar ejercicios de atención enfocada en nivel inicial
                  </span>
                  <span class="mat-span" *ngSwitchCase="1">
                      Se le recomienda realizar ejercicios de atención enfocada en nivel inicial
                  </span>
                  <span class="mat-span" *ngSwitchCase="2">
                      Se le recomienda realizar ejercicios de atención enfocada en nivel medio
                  </span>
                  <span class="mat-span" *ngSwitchCase="3">
                      Se le recomienda realizar ejercicios de atención enfocada en nivel avanzado
                  </span>
                  <span class="mat-span" *ngSwitchCase="4">
                      Se le recomienda realizar ejercicios de atención sostenida en nivel inicial
                  </span>
                  <span class="mat-span" *ngSwitchCase="5">
                      Se le recomienda realizar ejercicios de atención sostenida en nivel medio
                  </span>
                  <span class="mat-span" *ngSwitchCase="6">
                      Se le recomienda realizar ejercicios de atención sostenida en nivel avanzado
                  </span>
                  <span class="mat-span" *ngSwitchCase="7">
                      Se le recomienda realizar ejercicios de atención selectiva en nivel inicial
                  </span>
                  <span class="mat-span" *ngSwitchCase="8">
                      Se le recomienda realizar ejercicios de atención selectiva en nivel medio
                  </span>
                  <span class="mat-span" *ngSwitchCase="9">
                      Se le recomienda realizar ejercicios de atención selectiva en nivel avanzado
                  </span>
                  <span class="mat-span" *ngSwitchCase="10">
                      Se le recomienda realizar ejercicios de atención alternada en nivel inicial
                  </span>
                  <span class="mat-span" *ngSwitchCase="11">
                      Se le recomienda realizar ejercicios de atención alternada en nivel medio
                  </span>
                  <span class="mat-span" *ngSwitchCase="12">
                      Se le recomienda realizar ejercicios de atención alternada en nivel avanzado
                  </span>
                  <span class="mat-span" *ngSwitchCase="13">
                      Se le recomienda realizar ejercicios de atención dividida en nivel inicial
                  </span>
                  <span class="mat-span" *ngSwitchCase="14">
                      Se le recomienda realizar ejercicios de atención dividida en nivel medio
                  </span>
                  <span class="mat-span" *ngSwitchCase="15">
                      <span>ha obtenido una Puntuación Perfecta.</span>
                      Se le recomienda realizar ejercicios de atención dividida en nivel avanzado
                  </span>
                </h3>
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
export class ChartTestComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') Chart: ElementRef;
  @Input() testData: TestData;

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

    this.error = this.testData.exerciseDatas.map(p => p.error).reduce((prev, value) => prev + value, 0);

    this.omit = this.testData.exerciseDatas.map(p => p.omit).reduce((prev, value) => prev + value, 0);
    this.hit = this.testData.exerciseDatas.map(p => p.hit).reduce((prev, value) => prev + value, 0);

    this.totalPoints = (this.omit + this.hit) * 2;
    this.point = this.testData.exerciseDatas.map(p => p.point).reduce((prev, value) => prev + value, 0);

    this.score = this.testData.exerciseDatas.map(p => p.score).reduce((prev, value) => prev + value, 0);

    this.level = Math.round(this.score / this.testData.exerciseDatas.length);

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
          text: `Cuestionario ${this.testData.type}`
        }
      }
    });
  }

}
