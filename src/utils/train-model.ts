import * as tf from '@tensorflow/tfjs';
import { getDate, getMonth, getYear } from 'date-fns';

import { CONVERT_STOCKS } from '../pages/stocks/index.constant';
import { URLS, BASE_URL } from '../api/requests/requests.constant';
import { fitLinearRegression } from './trend';
import { ApiClient } from '../api/api-client';

import type { StockNames, Stocks } from '../store/store.interface';

export const trainModel = async (
  data: Stocks[],
): Promise<{ maes: number[]; model: tf.Sequential | tf.LayersModel }> => {
  let model: tf.Sequential | tf.LayersModel | undefined = undefined;

  const trainedModel = await tf.loadLayersModel(
    BASE_URL + URLS.PREDICTION.GET_MODEL,
  );

  if (trainedModel) {
    model = trainedModel;
  } else {
    const trainData = data.slice(0, Math.round(data.length * 0.7));
    const trainingData = await getDataForTraining(trainData);

    const xs = tf.tensor2d(trainingData.inputs, [
      trainingData.inputs.length,
      5,
    ]);
    const ys = tf.tensor2d(trainingData.output, [
      trainingData.output.length,
      1,
    ]);

    const newModel = tf.sequential();
    newModel.add(
      tf.layers.dense({
        units: 128,
        inputShape: [5],
        activation: 'relu',
      }),
    );
    newModel.add(
      tf.layers.dense({
        units: 64,
        activation: 'relu',
      }),
    );
    newModel.add(tf.layers.dropout({ rate: 0.2 }));

    newModel.add(
      tf.layers.dense({
        units: 32,
        activation: 'relu',
      }),
    );
    newModel.add(tf.layers.dense({ units: 1 }));
    newModel.compile({
      loss: 'meanAbsoluteError',
      optimizer: tf.train.adam(0.001),
    });

    await newModel.fit(xs, ys, {
      epochs: 500,
      batchSize: 32,
      callbacks: [
        {
          onEpochEnd(epoch: number, logs: unknown) {
            console.log(epoch, logs);
          },
        },
      ],
    });
    model = newModel;
  }

  const maes = await getMaes(data, model);

  return { maes, model };
};

const getDataForTraining = async (data: Stocks[]) => {
  // Наклон тренда (slope) пересчитывается каждые countRestart элементов
  let slope = 0;
  const countRestart = 80;

  const apiClient = new ApiClient();
  const moexIndexesData = await apiClient.prediction.getMoexIndexesByPeriod({
    startDate: new Date('2016-01-01'),
    endDate: new Date(),
  });

  const inputs: [
    year: number,
    month: number,
    day: number,
    nameCode: number,
    slope: number,
  ][] = [];
  const output: number[] = [];

  for (const [index, info] of data.entries()) {
    // Обновление наклона тренда каждые countRestart элементов
    if (index % countRestart === 0) {
      const startDate = info.date;
      const endDate =
        data[index + countRestart]?.date ?? data[data.length - 1].date;

      const moexIndexes: number[] = [];
      for (const moex of moexIndexesData.data) {
        if (moex.date >= startDate && moex.date <= endDate) {
          moexIndexes.push(+moex.index);
        }
      }

      const linearRegression = fitLinearRegression(moexIndexes);

      slope = Math.round(linearRegression.slope) ?? slope;
    }

    const parsedDateNumbers = transformDate(info.date.valueOf());
    inputs.push([
      ...parsedDateNumbers,
      CONVERT_STOCKS.TO_ENUM[info.name as StockNames],
      slope,
    ]);
    output.push(+info.index);
  }

  return { inputs, output };
};

export const getMaes = async (
  data: Stocks[],
  model: tf.Sequential | tf.LayersModel,
) => {
  const dataForTest = data.slice(Math.round(data.length * 0.7), data.length);
  const trainingData = await getDataForTraining(dataForTest);

  const predictionsOnTest = trainingData.inputs.map(input => {
    const inputTensor = tf.tensor2d([input], [1, 5]);
    const prediction = model?.predict(inputTensor) as tf.Tensor;
    const predictionValue = prediction.dataSync()[0];

    return { value: predictionValue, nameCode: input[3] };
  });

  const absoluteDiff = new Map<number, number[]>();
  for (let i = 0; i < dataForTest.length; i++) {
    const prev = absoluteDiff.get(predictionsOnTest[i].nameCode) ?? [];

    absoluteDiff.set(predictionsOnTest[i].nameCode, [
      ...prev,
      Math.abs(predictionsOnTest[i].value - trainingData.output[i]),
    ]);
  }

  const maes: number[] = [];
  absoluteDiff.forEach(el => {
    const diff = el.reduce((acc, diff) => diff + acc, 0);
    maes.push(diff / el.length);
  });

  return maes;
};

export function transformDate(
  date: number,
): [year: number, month: number, day: number] {
  const year = getYear(date) % 100;
  const month = getMonth(date) + 1;
  const day = getDate(date);
  return [year, month, day];
}
