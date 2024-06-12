import { AxiosRequestConfig } from 'axios';

import { api } from '../../instance';
import { URLS } from '../requests.constant';

import type {
  CreatePortfolioDto,
  UpdatePortfolioDto,
  GetMoexIndexesByPeriodDto,
} from './prediction.interface';

class PredictionService {
  public createPorfolio(dto: CreatePortfolioDto, config?: AxiosRequestConfig) {
    return api.post(URLS.PREDICTION.CREATE_PORTFOLIO, dto, config);
  }

  public getPortfolios(config?: AxiosRequestConfig) {
    return api.get(URLS.PREDICTION.GET_PORTFOLIOS, config);
  }

  public updatedPortfolio(id: number, dto: UpdatePortfolioDto, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.PREDICTION.UPDATE_PORTFOLIO.replace('$1', id.toString(10));

    return api.patch(normalizedUri, dto, config);
  }

  public deletePortfolio(id: number, config?: AxiosRequestConfig) {
    const normalizedUri = URLS.PREDICTION.UPDATE_PORTFOLIO.replace('$1', id.toString(10));

    return api.delete(normalizedUri, config);
  }

  public putMoexIndexesByPeriod(dto: GetMoexIndexesByPeriodDto, config?: AxiosRequestConfig) {
    return api.put(URLS.PREDICTION.GET_MOEX_INDEXES_BY_PERIOD, dto, config);
  }

  public getStocks(config?: AxiosRequestConfig) {
    return api.get(URLS.PREDICTION.GET_STOCKS, config);
  }
}

export default PredictionService;
