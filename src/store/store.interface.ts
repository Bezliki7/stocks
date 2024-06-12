export interface IStore {
  name: string;
  startDate: Date;
  endDate: Date;
  stocks: Stocks[];
  periodType: PeriodType;
  isMoreRisk: boolean;
  moexIndexes: MoexIndexes[];
  predictionOnStocks: PredictionOnStocks[];
}

export type Stocks = {
  id: number;
  name: StockNames;
  date: Date;
  index: number;
};

export type MoexIndexes = { name: 'IMOEX' } & Omit<Stocks, 'name' | 'profit' | 'mae'>;

export type PeriodType = 'short' | 'mid' | 'long';

export type StockNames =
  | 'LKOH'
  | 'MTSS'
  | 'MVID'
  | 'SBER'
  | 'SIBN'
  | 'VTBR'
  | 'ROSB'
  | 'ROSN'
  | 'GAZP'
  | 'BANE';

export type PredictionOnStocks = {
  name: StockNames;
  mae: number;
  profit: number;
};

export type Portfolio = {
  id: number;
  name: string;
  isMoreRisk: boolean;
  periodType: 'short' | 'mid' | 'long';
  dateOfCreation: Date;
  startDate: Date;
  endDate: Date;
  predictions: Prediction[];
};

export type Prediction = {
  stockName: StockNames;
  meanAbsoluteError: number;
  profit: number;
};

export type GetPortfoliosResponsePayload = Portfolio[];

export type FormFields = {
  name: string;
};
