import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription, Observable } from 'rxjs';
import { Test } from '@app/core/model/test.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/core/model/user.model';
import { TestData } from '@app/core/model/testData.model';


const initTestQuery = gql`
  query tests($where: TestWhereInput, $first: Int!) {
    tests(where: $where, first: $first) {
      id
      type
      description
      enable
      sections(where: {enable: true}) {
        id
        name
        description
        exercises {
          id
          code
          scale
          description
        }
      }
    }
  }
`;


const createTestData = gql`
  mutation createTestData($data: TestDataCreateInput!) {
    createTestData(data: $data) {
      id
    }
  }
`;

@Component({
  selector: 'app-init-test',
  templateUrl: './init-test.component.html',
  styles: [`
    .grid-container {
      padding: 0 10px 0 10px;
    }

    .list {
      list-style: none;
    }

    .mat-toolbar-row, .mat-toolbar-single-row {
      white-space: normal;
    }

    .button-action {
      display: flex;
      flex-direction: row;
    }
  `]
})
export class InitTestComponent implements OnInit, OnDestroy {

  test: Test;
  loading = false;

  testQuerySubscription: Subscription;

  currentUser: Observable<User>;
  user: User;
  today: Date;
  name: string;
  testData: TestData;

  flagFinishTest = false;

  level = 0;
  score = 0;

  multiple: boolean[][] = [];
  steps: boolean[];

  constructor(
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService
  ) {
    this.today = new Date();
   }

  ngOnInit() {
    this.loading = true;
    this.currentUser = this.authService.getAsyncUser();

    this.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.name = user.firstname;

        this.testData = {
          createdBy: user,
          initAt: this.today,
          finalAt: new Date(),
          type: 'INICIAL',
          exerciseDatas: []
        };
      }
    });

    this.testQuerySubscription = this.apollo
      .watchQuery<any>({
        query: initTestQuery,
        variables: {
          where: {
            'type': 'INICIAL',
            'enable': true
          },
          first: 1
        }
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          if (!loading) {

            if (data.tests.length > 0) {
              this.test = data.tests[0];
              this.steps = new Array<boolean>(this.test.sections.length);
              for (let i = 0; i < this.test.sections.length; i++) {
                this.multiple.push([]);
                for (let g = 0; g < this.test.sections[i].exercises.length; g++) {
                  this.multiple[i][g] = false;
                }
              }
            }
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
          this.snackBar.open(error, 'X', { duration: 3000 });
        }
      );
  }

  ngOnDestroy(): void {
    this.testQuerySubscription.unsubscribe();
    this.testData = null;
  }

  saveTest(): void {

    if (this.testData) {
      this.flagFinishTest = true;
      this.apollo.mutate({
        mutation: createTestData,
        variables: {
          data: {
            type: this.testData.type,
            initAt: this.today,
            finalAt: new Date(),
            createdBy: {
              connect: {
                id: this.testData.createdBy.id
              }
            },
            exerciseDatas: {
              create: this.testData.exerciseDatas
            }
          }
        }
      }).subscribe(( {data} ) => {
        this.loading = false;

        if (data) {
          this.snackBar.open(`Cuestionario guardado correctamente`, 'X', {duration: 3000});
          this.router.navigate(['dashboard']);
        }
      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', {duration: 3000});
      });
    } else {
      this.snackBar.open('Error al guardar cuestionario...', 'X', {duration: 3000});
    }
  }

  nextStepper(i: number, g: number, count: number) {
    this.multiple[i][g] = true;
    let flag = false;

    for (let h = 0; h < count; h++) {
      if (!this.multiple[i][h]) {
        flag = false;
        break;
      }
      flag = true;
    }

    if (flag) {
      this.steps[i] = true;
    }
  }

  saveExercise($datas, i, g, count) {

    this.testData.exerciseDatas.push($datas);
    this.multiple[i][g] = true;
    let flag = false;

    for (let h = 0; h < count; h++) {
      if (!this.multiple[i][h]) {
        flag = false;
        break;
      }
      flag = true;
    }

    if (flag) {
      this.steps[i] = true;
    }

    if ($datas.score) {
      this.score += $datas.score;
    }
    this.level = Math.round(this.score / this.testData.exerciseDatas.length);
  }
}
