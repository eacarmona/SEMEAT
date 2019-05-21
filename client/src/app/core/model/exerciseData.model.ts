import { User } from '@app/core/model/user.model';
import { Exercise } from '@app/core/model/exercise.model';

export type DateTime = Date | string;

export interface ExerciseData {
  id?: string;
  initAt?: DateTime;
  finalAt?: DateTime;
  createdBy: User;
  exercise?: Exercise;
  result?: Result[];
  dificulty?: string;
  hit?: number;
  fault?: number;
  omit?: number;
  error?: number;
  point?: number;
  score?: number;
}

export interface Result {
  question: string;
  response: string;
}
