import { SerasaEvaluationSequence } from 'src/domain/evaluationSequences/serasaEvaluationSequence';
import { RulesFactory } from './RulesFactory';

export class SequenceFactory {
  private activeSequences: string[];
  private sequences = [SerasaEvaluationSequence];
  constructor() {
    this.activeSequences = process.env.ACTIVE_SEQUENCES.split('|');
  }

  getActiveSequences() {
    return this.activeSequences.map((activeSequence) => {
      console.log({ activeSequence });
      const sequence = this.sequences.find(
        (sequence) => sequence.name === activeSequence,
      );
      const activeRules = this.getActiveRules();
      return new sequence(activeRules);
    });
  }

  private getActiveRules() {
    return new RulesFactory().getActiveRules();
  }
}
