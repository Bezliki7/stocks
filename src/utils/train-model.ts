import * as tf from '@tensorflow/tfjs';
import { format } from 'date-fns';

import { CONVERT_STOCKS } from '../pages/stocks/index.constant';
import { URLS, BASE_URL } from '../api/requests/requests.constant';

import type { StockNames, Stocks } from '../store/store.interface';

export default async (
  data: Stocks[],
): Promise<{ maes: number[]; model: tf.Sequential | tf.LayersModel }> => {
  let model: tf.Sequential | tf.LayersModel | undefined = undefined;

  const trainedModel = await tf.loadLayersModel(BASE_URL + URLS.PREDICTION.GET_MODEL);

  if (trainedModel) {
    model = trainedModel;
  } else {
    const trainData = data.slice(0, Math.round(data.length * 0.7));
    const { inputs, output } = normalizeData(trainData);

    const xs = tf.tensor2d(inputs, [inputs.length, 4]);
    const ys = tf.tensor2d(output, [output.length, 1]);

    const newModel = tf.sequential();
    newModel.add(
      tf.layers.dense({
        units: 64,
        inputShape: [4],
        activation: 'relu',
      }),
    );
    newModel.add(
      tf.layers.dense({
        units: 32,
        activation: 'relu',
      }),
    );
    newModel.add(tf.layers.dropout({ rate: 0.2 }));
    newModel.add(
      tf.layers.dense({
        units: 16,
        activation: 'relu',
      }),
    );
    newModel.add(tf.layers.dense({ units: 1 }));
    newModel.compile({ loss: 'meanAbsoluteError', optimizer: tf.train.adam(0.001) });

    await newModel.fit(xs, ys, {
      epochs: 100,
      batchSize: 32,
      callbacks: [
        {
          onEpochEnd(epoch: number, logs: any) {
            console.log(epoch, logs);
          },
        },
      ],
    });
    model = newModel;
  }

  const testData = data.slice(Math.round(data.length * 0.7), data.length);
  const { inputs: testInputs, output: testOutput } = normalizeData(testData);

  const predictionsOnTest = testInputs.map((input) => {
    const inputTensor = tf.tensor2d([input], [1, 4]);
    const prediction = model?.predict(inputTensor) as tf.Tensor;
    const predictionValue = prediction.dataSync()[0];

    return { value: predictionValue, nameCode: input[3] };
  });

  const absoluteDiff = new Map<number, number[]>();
  for (let i = 0; i < testData.length; i++) {
    const prev = absoluteDiff.get(predictionsOnTest[i].nameCode) ?? [];

    absoluteDiff.set(predictionsOnTest[i].nameCode, [
      ...prev,
      Math.abs(predictionsOnTest[i].value - testOutput[i]),
    ]);
  }

  const maes: number[] = [];
  absoluteDiff.forEach((el) => {
    const diff = el.reduce((acc, diff) => diff + acc, 0);
    maes.push(diff / el.length);
  });

  if (model) {
    // model.save('downloads://model');
  }

  return { maes, model };
};

const normalizeData = (data: Stocks[]) => {
  const normalizedData = data.map((info) => ({
    date: +format(info.date, 'yyMMdd'),
    price: Math.round(+info.index),
    nameCode: CONVERT_STOCKS.TO_ENUM[info.name as StockNames],
  }));

  const inputs = normalizedData.map((item) => [...transformDate(item!.date), item.nameCode]);
  const output = normalizedData.map((item) => item!.price);

  return { inputs, output };
};

export function transformDate(date: number) {
  const year = Math.floor(date / 10000);
  const month = Math.floor((date % 10000) / 100);
  const day = date % 100;
  return [year, month, day];
}
