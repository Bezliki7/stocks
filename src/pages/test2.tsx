import * as tf from '@tensorflow/tfjs';

const getData = () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    data.push({ date: `2021-01-${String(i).padStart(2, '0')}`, price: i });
  }
  return data;
};

const TestML = () => {
  const data = getData();

  const input = data.map((item) => new Date(item.date).getTime());
  const output = data.map((item) => item.price);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 64, inputShape: [1], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'adam' });

  const xs = tf.tensor2d(input, [input.length, 1]);
  const ys = tf.tensor2d(output, [output.length, 1]);

  model.fit(xs, ys, { epochs: 100 }).then(() => {
    const newDate = new Date('2021-01-29').getTime();
    const prediction = model.predict(tf.tensor2d([newDate], [1, 1]));
    // @ts-ignore
    prediction.print();
  });

  return <></>;
};

export default TestML;
