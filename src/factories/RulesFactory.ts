import { CreditAmountRule } from 'src/domain/evaluationRules/creditAmountRule';
import { ManualEvaluationRule } from 'src/domain/evaluationRules/manualEvaluationRule';
import { MinimumScoreRule } from 'src/domain/evaluationRules/miniumScore';

export class RulesFactory {
  private activeRules: string[];
  private rules = [MinimumScoreRule, ManualEvaluationRule, CreditAmountRule];
  constructor() {
    this.activeRules = process.env.ACTIVE_RULES.split('|');
  }

  getActiveRules() {
    return this.activeRules.map((activeRule) => {
      const rule = this.rules.find((rule) => rule.name === activeRule);
      return new rule();
    });
  }
}
