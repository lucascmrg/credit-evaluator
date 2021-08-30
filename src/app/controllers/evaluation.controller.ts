import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationRequest } from '../../interfaces/evaluationRequest';
import { EvaluateUserCredit } from '../useCases/evaluateUserCredit';

@Controller()
export class EvaluationController {
  constructor(private readonly evaluateUserCredit: EvaluateUserCredit) {}

  @Post()
  evaluate(@Body() evaluationRequest: EvaluationRequest) {
    return this.evaluateUserCredit.evaluate(evaluationRequest);
  }
}
