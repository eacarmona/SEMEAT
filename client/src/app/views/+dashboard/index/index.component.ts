import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { MatSnackBar } from '@angular/material';
import { TestData } from '@app/core/model/testData.model';
import { ExerciseData } from '@app/core/model/exerciseData.model';


const testDataQuery = gql`
  query testData($where: TestDataWhereInput!, $first: Int) {
    testDatas (where: $where, first: $first)  {
      id
      type
      createdBy {
        firstname
      }
      initAt
      finalAt
      exerciseDatas {
        hit
        fault
        omit
        error
        point
        exercise {
          scale
        }
        score
      }
    }
  }
`;

const exerciseQuery = gql`
query exerciseDatas($where: ExerciseDataWhereInput!) {
  exerciseDatas (where: $where)  {
    id
    initAt
    finalAt
    dificulty
    exercise {
      code
    }
    result {
      question
      response
    }
    createdBy {
      email
    }
    point
    hit
    score
    error
    fault
    omit
  }
}
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  isAdmin: Observable<boolean>;
  isSpecialist: Observable<boolean>;
  isStudent: Observable<boolean>;

  testData: TestData[];
  exerciseData: ExerciseData[];
  testDataQuerySubcription: Subscription;
  exerciseDataQuerySubcription: Subscription;
  loading = false;

  constructor(
    private authService: AuthService,
    private apollo: Apollo,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isSpecialist = this.authService.isSpecialist();
    this.isStudent = this.authService.isStudent();

    this.isStudent.subscribe(flag => {
      if (flag) {

        this.loading = false;

        this.testDataQuerySubcription = this.apollo
          .watchQuery<any>({
            query: testDataQuery,
            variables: {
              where: {
                'type': 'INICIAL',
                'createdBy': {
                  'id': this.authService.getUser().id
                }
              },
              first: 1
            }
          })
          .valueChanges.subscribe(
            ({ data, loading }) => {
              this.loading = loading;
              if (!loading) {
                if (data.testDatas.length > 0) {
                  this.testData = data.testDatas[0];
                }
              }
            },
            (error) => {
              this.loading = false;
              this.snackBar.open(error.message, 'X', {
                duration: 3000
              });
            }
          );

          this.exerciseDataQuerySubcription = this.apollo
          .watchQuery<any>({
            query: exerciseQuery,
            variables: {
              where: {
                exercise: {level_not: 'NINGUNO'}
              }
            }
          })
          .valueChanges.subscribe(
            ({ data, loading }) => {
              this.loading = loading;
              if (!loading) {
                if (data.exerciseDatas.length > 0) {
                  this.exerciseData = data.exerciseDatas;
                }
              }
            },
            (error) => {
              this.loading = false;
              this.snackBar.open(error.message, 'X', {
                duration: 3000
              });
            }
          );
        }
    });
  }

  ngOnDestroy(): void {
    if (this.testDataQuerySubcription) {
      this.testDataQuerySubcription.unsubscribe();
    }
    if (this.exerciseDataQuerySubcription) {
      this.exerciseDataQuerySubcription.unsubscribe();
    }
  }

}
