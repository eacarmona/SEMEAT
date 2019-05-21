import { User } from '@app/core/model/user.model';
import { DateTime, ExerciseData } from '@app/core/model/exerciseData.model';

export interface TestData {
  id?: string;
  type: string;
  createdBy: User;
  initAt: DateTime;
  finalAt: DateTime;
  exerciseDatas?: ExerciseData[];
}
