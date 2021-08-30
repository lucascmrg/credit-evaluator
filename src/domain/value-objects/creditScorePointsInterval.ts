export class CreditScorePointsPercentageInterval {
  public minimum: number;
  public maximum: number;
  public incomePercentageValue: number;

  constructor(minimum: number, maximum: number, incomePercentageValue: number) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.incomePercentageValue = incomePercentageValue;
  }
}
