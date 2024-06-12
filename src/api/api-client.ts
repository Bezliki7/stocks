import PredictionService from './requests/prediction/prediction';

export class ApiClient {
  public prediction: PredictionService;

  constructor() {
    this.prediction = new PredictionService();
  }
}
