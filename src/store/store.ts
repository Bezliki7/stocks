import { flow, makeAutoObservable } from 'mobx';
import axios from 'axios';

import type { IStore, Statistics } from './store.interface';

export class Store {
  public startDate: Date | undefined;
  public endDate: Date | undefined;

  public statics: Statistics[] = [];

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
    const url = 'https://serevr-stocks.onrender.com/main';

    const res = yield axios.put(url, {
      startDate: this.startDate,
      endDate: this.endDate,
    });

    this.statics = res.data;
  });
}
