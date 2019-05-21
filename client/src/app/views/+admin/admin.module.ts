import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { RoleGuard } from '@app/core/guard/role.guard';

import { UserListComponent } from './user/list/user-list.component';
import { UserCreateComponent } from './user/create/user-create.component';
import { UserUpdateComponent } from './user/update/user-update.component';
import { UserDetailsComponent } from './user/details/user-details.component';

import { RoleListComponent } from './role/list/role-list.component';
import { RoleCreateComponent } from './role/create/role-create.component';
import { RoleUpdateComponent } from './role/update/role-update.component';
import { RoleDetailsComponent } from './role/details/role-details.component';

import { FileListComponent } from './file/list/file-list.component';
import { FileUploadComponent } from './file/upload/file-upload.component';
import { FileChangeComponent } from './file/change/file-change.component';
import { FileDetailsComponent } from './file/details/file-details.component';
import { ExerciseListComponent } from './exercise/list/exercise-list.component';
import { ExerciseDetailsComponent } from './exercise/details/exercise-details.component';
import { ExerciseCreateComponent } from './exercise/create/exercise-create.component';
import { ExerciseUpdateComponent } from './exercise/update/exercise-update.component';
import { SectionListComponent } from './section/list/section-list.component';
import { SectionCreateComponent } from './section/create/section-create.component';
import { SectionDetailsComponent } from './section/details/section-details.component';
import { SectionUpdateComponent } from './section/update/section-update.component';
import { TestListComponent } from './test/list/test-list.component';
import { TestCreateComponent } from './test/create/test-create.component';
import { TestDetailsComponent } from './test/details/test-details.component';
import { TestUpdateComponent } from './test/update/test-update.component';
import { SectionAddComponent } from './section/add/section-add.component';
import { TestAddComponent } from './test/add/test-add.component';


const routes: Routes = [
  {
    path: 'user',
    component: UserListComponent,
    data: {title: 'Listado de Usuarios', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'user/create',
    component: UserCreateComponent,
    data: {title: 'Crear Usuario', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'user/update/:id',
    component: UserUpdateComponent,
    data: {title: 'Modificar Usuario', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'user/details/:id',
    component: UserDetailsComponent,
    data: {title: 'Detalles Usuario', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'role',
    component: RoleListComponent,
    data: {title: 'Listado de Roles', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'role/create',
    component: RoleCreateComponent,
    data: {title: 'Crear Rol', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'role/update/:id',
    component: RoleUpdateComponent,
    data: {title: 'Modificar Rol', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'role/details/:id',
    component: RoleDetailsComponent,
    data: {title: 'Detalles Rol', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'file',
    component: FileListComponent,
    data: {title: 'Listado de Files', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'file/upload',
    component: FileUploadComponent,
    data: {title: 'Subir Archivo', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'file/change/:id',
    component: FileChangeComponent,
    data: {title: 'Cambiar Archivo', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'file/details/:id',
    component: FileDetailsComponent,
    data: {title: 'Detalles archivo', expectedRole: ['Administrador']},
    canActivate: [RoleGuard]
  },
  {
    path: 'exercise',
    component: ExerciseListComponent,
    data: {title: 'Listado de Ejercicios', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'exercise/create',
    component: ExerciseCreateComponent,
    data: {title: 'Crear Ejercicio', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'exercise/update/:id',
    component: ExerciseUpdateComponent,
    data: {title: 'Modificar Ejercicio', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'exercise/details/:id',
    component: ExerciseDetailsComponent,
    data: {title: 'Detalles ejercicio', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'section',
    component: SectionListComponent,
    data: {title: 'Listado de Secciones', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'section/create',
    component: SectionCreateComponent,
    data: {title: 'Crear Sección', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'section/details/:id',
    component: SectionDetailsComponent,
    data: {title: 'Detalles Sección', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'section/update/:id',
    component: SectionUpdateComponent,
    data: {title: 'Modificar Sección', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'test',
    component: TestListComponent,
    data: {title: 'Listado de Cuestionarios', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'test/create',
    component: TestCreateComponent,
    data: {title: 'Crear Cuestionario', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'test/details/:id',
    component: TestDetailsComponent,
    data: {title: 'Detalles de Cuestionario', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
  {
    path: 'test/update/:id',
    component: TestUpdateComponent,
    data: {title: 'Modificar Cuestionario', expectedRole: ['Especialista']},
    canActivate: [RoleGuard]
  },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserListComponent, UserCreateComponent, UserUpdateComponent, UserDetailsComponent,
    RoleListComponent, RoleCreateComponent, RoleUpdateComponent, RoleDetailsComponent,
    FileListComponent, FileUploadComponent, FileChangeComponent, FileDetailsComponent,
    ExerciseListComponent, ExerciseCreateComponent, ExerciseUpdateComponent, ExerciseDetailsComponent,
    SectionListComponent, SectionCreateComponent, SectionDetailsComponent, SectionUpdateComponent, SectionAddComponent,
    TestListComponent, TestCreateComponent, TestDetailsComponent, TestUpdateComponent, TestAddComponent
  ],
  entryComponents: [
    SectionAddComponent,
    TestAddComponent
  ],
})

export class AdminModule { }
