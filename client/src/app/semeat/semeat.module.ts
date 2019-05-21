import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SemeatA0Component } from './semeat-a0/semeat-a0.component';
import { SemeatA1Component } from './semeat-a1/semeat-a1.component';
import { SemeatA2Component } from './semeat-a2/semeat-a2.component';
import { SemeatA3Component } from './semeat-a3/semeat-a3.component';
import { SemeatA4Component } from './semeat-a4/semeat-a4.component';
import { SemeatA5Component } from './semeat-a5/semeat-a5.component';
import { SemeatA6Component } from './semeat-a6/semeat-a6.component';
import { SemeatAbComponent } from './semeat-ab/semeat-ab.component';
import { SemeatA7Component } from './semeat-a7/semeat-a7.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SemeatA0Component, SemeatA1Component,
    SemeatA2Component, SemeatA3Component,
    SemeatA4Component, SemeatA5Component,
    SemeatA6Component, SemeatAbComponent,
    SemeatA7Component
  ],
  declarations: [
    SemeatA0Component, SemeatA1Component,
    SemeatA2Component, SemeatA3Component,
    SemeatA4Component, SemeatA5Component,
    SemeatA6Component,
    SemeatAbComponent,
    SemeatA7Component
  ]
})
export class SemeatModule {
  static forRoot() {
    return {
      ngModule: SemeatModule,
      providers: []
    };
  }
 }
