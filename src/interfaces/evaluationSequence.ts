import { UserEvaluationData } from './userEvaluationData';

export interface EvaluationSequence {
  name: string;
  evaluate(userEvaluationData: UserEvaluationData);
}
