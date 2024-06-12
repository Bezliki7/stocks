import { Portfolio } from '../../../store/store.interface';

export type CreatePortfolioDto = Omit<Portfolio, 'id'>;

export type UpdatePortfolioDto = Omit<Portfolio, 'id'>;

export type GetMoexIndexesByPeriodDto = {
  startDate: Date;
  endDate: Date;
};
