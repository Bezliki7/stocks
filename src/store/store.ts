import { flow, makeAutoObservable } from 'mobx';
import * as tf from '@tensorflow/tfjs';
import { eachDayOfInterval, format, parse, subYears } from 'date-fns';

import { PERIOD_TYPE } from '../pages/stocks/components/modals/prediction-modal/components/period/period.constant';
import { convertPeriodType } from '../utils/period';
import { CONVERT_STOCKS, StocksEnum } from '../pages/stocks/index.constant';
import { DATE_FORMAT } from './store.constant';
import { ApiClient } from '../api/api-client';

import type {
  IStore,
  PeriodType,
  Stocks,
  MoexIndexes,
  PredictionOnStocks,
  Portfolio,
} from './store.interface';
import { transformDate } from '../utils/train-model';

export class Store {
  public model: undefined | tf.LayersModel | tf.Sequential;
  public isPredictionModalOpen: boolean = false;
  public isEdit: boolean = false;
  public isLoading: boolean = false;
  public selectedPortfolioId: number | undefined;
  public predictionsIsReady: boolean = false;

  public name: string | undefined = '';

  public isMoreRisk: boolean = false;

  public startDate: Date = subYears(new Date(), 2);
  public endDate: Date = new Date();
  public moexIndexes: MoexIndexes[] = [];

  public dateOfCreation: Date = new Date();
  public periodType: PeriodType = PERIOD_TYPE.SHORT;

  public portfolios: Portfolio[] = [];

  public stocks: Stocks[] = [];
  public predictionOnStocks: PredictionOnStocks[] = [];

  public setPredictionModalOpen(value: boolean) {
    this.isPredictionModalOpen = value;
  }

  public setSelectedPortfolioId(id: number) {
    this.selectedPortfolioId = id;
  }

  public get selectedPortfolio() {
    return this.portfolios.find(({ id }) => id === this.selectedPortfolioId);
  }

  constructor() {
    makeAutoObservable(this);
  }

  public setProperties(payload: Partial<IStore>) {
    for (const key of Object.keys(payload)) {
      // @ts-ignore гарантировано правильный тип
      if (payload[key] !== undefined) {
        // @ts-ignore гарантировано правильный тип
        this[key] = payload[key];
      }
    }
  }

  public getMoexIndexesByPeriod = flow(function* (this: Store) {
    const apiClient = new ApiClient();
    const res = yield apiClient.prediction.putMoexIndexesByPeriod({
      startDate: this.startDate,
      endDate: this.endDate,
    });

    this.moexIndexes = res.data;
  });

  public getStocks = flow(function* (this: Store) {
    const apiClient = new ApiClient();
    const res = yield apiClient.prediction.getStocks();

    this.stocks = res.data;
  });

  public getPrediction() {
    const endDate = parse(convertPeriodType(this.periodType), DATE_FORMAT, 0);
    const days = eachDayOfInterval({ start: new Date(), end: endDate });
    const predictionsMap = new Map<string, number[]>();

    days.forEach((day) => {
      const formatedDate = +format(day, 'yyMMdd');

      if (this.model) {
        const { length } = this.predictionOnStocks;

        for (let stockCode = 0; stockCode < length; stockCode++) {
          const currentStockName = CONVERT_STOCKS.TO_STR[stockCode as StocksEnum];

          const input = [...transformDate(formatedDate), stockCode];
          const inputTensor = tf.tensor2d([input], [1, 4]);

          const prediction = this.model.predict(inputTensor) as tf.Tensor;
          const predictionValue = prediction.dataSync()[0];

          const stocksPrices = predictionsMap.get(currentStockName) ?? [];

          predictionsMap.set(currentStockName, [...stocksPrices, predictionValue]);
        }
      }
    });

    for (const [name, predictionPrices] of predictionsMap.entries()) {
      const profit = predictionPrices.reduce((acc, price) => acc + price, 0);

      this.predictionOnStocks.map((predictionOnStock, index) => {
        if (predictionOnStock.name === name) {
          this.predictionOnStocks[index] = {
            ...this.predictionOnStocks[index],
            profit: profit / predictionPrices.length,
          };
        }
      });
    }

    if (!this.predictionsIsReady) {
      this.filterStocksInfo();
    }
  }

  public get dto(): Omit<Portfolio, 'id'> {
    return {
      name: this.name ?? '',
      dateOfCreation: new Date(),
      startDate: this.startDate!,
      endDate: this.endDate!,
      isMoreRisk: this.isMoreRisk,
      periodType: this.periodType,
      predictions: this.predictionOnStocks.map((predictionOnStock) => ({
        meanAbsoluteError: predictionOnStock.mae,
        stockName: predictionOnStock.name,
        profit: predictionOnStock.profit,
      })),
    };
  }

  public getPortfolios = flow(function* (this: Store) {
    const apiClient = new ApiClient();

    const response = yield apiClient.prediction.getPortfolios();

    this.portfolios = response.data;
  });

  public createPortfolio = flow(function* (this: Store) {
    const apiClient = new ApiClient();
    const response = yield apiClient.prediction.createPorfolio(this.dto);

    this.portfolios.push(response.data);
  });

  public updatePortfolio = flow(function* (this: Store) {
    if (this.selectedPortfolioId) {
      const apiClient = new ApiClient();

      const response = yield apiClient.prediction.updatedPortfolio(
        this.selectedPortfolioId,
        this.dto,
      );

      const index = this.portfolios.findIndex(({ id }) => id === response.data.id);
      this.portfolios[index] = response.data;
    }
  });

  public deletePortdolio = flow(function* (this: Store) {
    try {
      if (this.selectedPortfolioId) {
        const apiClient = new ApiClient();

        yield apiClient.prediction.deletePortfolio(this.selectedPortfolioId);

        this.portfolios = this.portfolios.filter(
          (portfolio) => portfolio.id !== this.selectedPortfolioId,
        );
      }
    } catch (err) {
      console.error(err);
    }
  });

  public clear() {
    this.name = '';
    this.periodType = PERIOD_TYPE.SHORT;
    this.isMoreRisk = false;
    this.moexIndexes = [];
    this.startDate = subYears(new Date(), 2);
    this.endDate = new Date();
    this.predictionOnStocks = [];
    this.predictionsIsReady = false;
  }

  public applyPortfolio(data: Portfolio) {
    this.name = data.name;
    this.isMoreRisk = data.isMoreRisk;
    this.endDate = data.endDate;
    this.startDate = data.startDate;
    this.predictionOnStocks = data.predictions.map((predictoin) => ({
      mae: predictoin.meanAbsoluteError,
      name: predictoin.stockName,
      profit: predictoin.profit,
    }));
    this.periodType = data.periodType;
    this.dateOfCreation = data.dateOfCreation;
    this.predictionsIsReady = true;
  }

  public openPredictionModalToEdit = () => {
    if (this.selectedPortfolio) {
      this.isPredictionModalOpen = true;
      this.isEdit = true;
      this.applyPortfolio(this.selectedPortfolio);
    }
  };

  public openPredictionModalToCreate = () => {
    this.clear();
    this.isPredictionModalOpen = true;
  };

  public save = () => {
    if (this.isEdit) {
      this.updatePortfolio();
    } else {
      this.createPortfolio();
    }
  };

  private filterStocksInfo = () => {
    if (this.isMoreRisk) {
      this.predictionOnStocks = this.predictionOnStocks.sort((a, b) => a.profit - b.profit);
    } else {
      this.predictionOnStocks = this.predictionOnStocks.sort((a, b) => b.mae - a.mae);
    }

    const halfOfLength = this.predictionOnStocks.length / 2;
    this.predictionOnStocks = this.predictionOnStocks.slice(halfOfLength).reverse();
    this.predictionsIsReady = true;
  };

  public setMaesOnStocks = (maes: number[]) => {
    this.predictionOnStocks = [];
    this.predictionsIsReady = false;

    maes.map((mae, nameCode: StocksEnum) => {
      const stockName = CONVERT_STOCKS.TO_STR[nameCode];

      this.predictionOnStocks.push({ mae, name: stockName, profit: 0 });
    });
  };
}
