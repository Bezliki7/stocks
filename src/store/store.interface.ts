export type IStore = {
  startDate: Date;
  endDate: Date;
  statistics: Statistics;
};

export type Statistics = {
  id: number;
  date: Date;
  index: number;
};
