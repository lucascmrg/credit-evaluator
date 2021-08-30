import { UserEvaluationData } from './userEvaluationData';

export interface EvaluationRule {
  execute(userEvaluationData: UserEvaluationData);
}
