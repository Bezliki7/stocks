// @ts-ignore
import React from 'react';
import * as tf from '@tensorflow/tfjs';
import useStore from '../hooks/use-store';
import { toJS } from 'mobx';
import { buildCnn, cnn } from '../utils/tf';
import { print } from '../utils/helper';
const els = [
  {
    Date: '1980-12-08',
    Open: 0.513393,
    High: 0.515625,
    Low: 0.513393,
    Close: 0.513393,
    'Adj Close': 0.023268,
    Volume: 117258400,
  },
  {
    Date: '1980-12-15',
    Open: 0.488839,
    High: 0.506696,
    Low: 0.450893,
    Close: 0.504464,
    'Adj Close': 0.022863,
    Volume: 122533600,
  },
  {
    Date: '1980-12-22',
    Open: 0.529018,
    High: 0.636161,
    Low: 0.529018,
    Close: 0.633929,
    'Adj Close': 0.028731,
    Volume: 46972800,
  },
  {
    Date: '1980-12-29',
    Open: 0.642857,
    High: 0.645089,
    Low: 0.609375,
    Close: 0.616071,
    'Adj Close': 0.027921,
    Volume: 54863200,
  },
  {
    Date: '1981-01-05',
    Open: 0.604911,
    High: 0.604911,
    Low: 0.540179,
    Close: 0.569196,
    'Adj Close': 0.025797,
    Volume: 49476000,
  },
  {
    Date: '1981-01-12',
    Open: 0.569196,
    High: 0.569196,
    Low: 0.544643,
    Close: 0.553571,
    'Adj Close': 0.025089,
    Volume: 22125600,
  },
  {
    Date: '1981-01-19',
    Open: 0.587054,
    High: 0.591518,
    Low: 0.569196,
    Close: 0.584821,
    'Adj Close': 0.026505,
    Volume: 33583200,
  },
];

const Test = () => {
  const { store } = useStore();

  function prepareData() {
    const data = store.statics;
    const inputs = [];
    const dates = [];
    const labels = [];
    const indexes = [];
    // console.log(toJS(data));
    for (let i = 0; i <= data.length - 1; i++) {
      if (data.length / 2 > i) {
        // inputs.push(data[i].index);
        // dates.push(data[i].date);
        indexes.push(i);
        inputs.push(i);
        dates.push(i);
      } else {
        labels.push(data[i].index);
      }
    }
    return { inputs: [inputs, dates, indexes], labels };
  }

  function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [3], units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
    return model;
  }

  async function trainModel(model: any, inputs: any, labels: any) {
    // const prices = inputs[0];
    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(labels, [labels.length, 1]);
    xs.print();
    console.log(xs, ys);
    await model.fit(xs, ys, { epochs: 50 });
  }

  async function predict(model: any, newData: any) {
    const result = await model.predict(tf.tensor2d(newData, [1, newData.length]));
    return result.dataSync()[0];
  }

  async function run() {
    // Получение данных
    const { inputs, labels } = prepareData();
    // Создание и обучение модели
    const model = createModel();
    await trainModel(model, inputs, labels);

    // Предсказание новых данных
    const newData = [300];
    const prediction = await predict(model, newData);
    console.log('Prediction:', prediction);
  }

  const rr = () => {
    buildCnn(els).then(function (built: any) {
      cnn(built.model, built.data, 100).then(function (e: any) {
        print('Completed tests at ' + new Date() + '... thanks for waiting!');
      });
    });
  };

  return (
    <>
      <button onClick={() => run()}>predict</button>
      <button onClick={() => rr()}>sadasda</button>
    </>
  );
};

export default Test;

// // Step 3 - Execute!
// print('Beginning AAPL CNN tests at ' + new Date() + '... this may take a while!');
// fetchWrapper('http://localhost:3000/main/').then(function (data: any) {
//   prep(data).then(function (result: any) {
//     buildCnn(result).then(function (built: any) {
//       cnn(built.model, built.data, 100).then(function (e: any) {
//         print('Completed tests at ' + new Date() + '... thanks for waiting!');
//       });
//     });
//   });
// });

// Подключение TensorFlow.js

