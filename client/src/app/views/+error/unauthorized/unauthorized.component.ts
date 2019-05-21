import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <br />
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center">
      <div class="item  mat-elevation-z8" fxFlex="90%" >
          <h1 class="mat-h1">Página no encontrada</h1>
      </div>
    </div>
  `,
  styles: [`
    .container {
      margin: 20px;
    }

    .item {
      padding: 20px;
      padding-bottom: 10px;
    }
  `]
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
