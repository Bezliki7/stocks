export const URLS = {
  PREDICTION: {
    CREATE_PORTFOLIO: '/prediction/portfolio',
    GET_PORTFOLIOS: '/prediction/portfolios',
    UPDATE_PORTFOLIO: '/prediction/portfolio/$1',
    GET_MOEX_INDEXES_BY_PERIOD: '/prediction/moexes',
    GET_STOCKS: '/prediction/stocks',
    GET_MODEL: '/prediction/model',
  },
} as const;

export const BASE_URL = `${window.location.protocol}//localhost:3000`;
