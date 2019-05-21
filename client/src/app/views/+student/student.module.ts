import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { RoleGuard } from '@app/core/guard/role.guard';
import { InitTestComponent } from './init-test/init-test.component';
import { SemeatModule } from '@app/semeat/semeat.module';
import { ExerciseViewerComponent } from './exercise-viewer/exercise-viewer.component';
import { TestViewerComponent } from './test-viewer/test-viewer.component';


const routes: Routes = [
  {
    path: 'init-test',
    component: InitTestComponent,
    data: {title: 'Cuestionario Inicial', expectedRole: ['Estudiante']},
    canActivate: [RoleGuard]
  },
  {
    path: 'exercise_viewer/:id/:dificulty',
    component: ExerciseViewerComponent,
    data: {title: 'Visor de Ejercicios', expectedRole: ['Estudiante']},
    canActivate: [RoleGuard]
  },
  {
    path: 'test_viewer/:id',
    component: TestViewerComponent,
    data: {title: 'Visor de Cuestionarios', expectedRole: ['Estudiante']},
    canActivate: [RoleGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SemeatModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitTestComponent, ExerciseViewerComponent, TestViewerComponent]
})
export class StudentModule { }
