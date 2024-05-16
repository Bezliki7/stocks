import * as tf from "@tensorflow/tfjs";
import { format } from "date-fns";

const getData = () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    data.push({ date: `2021-01-${String(i).padStart(2, "0")}`, price: i });
  }
  return data;
};

export const trainModel = async (): Promise<tf.Sequential> => {
  const data = getData();

  const input = data.map((item) => +format(new Date(item.date), "MMdd"));
  const output = data.map((item) => item.price);

  const xs = tf.tensor2d(input, [input.length, 1]);
  const ys = tf.tensor2d(output, [output.length, 1]);

  const newModel = tf.sequential();
  newModel.add(
    tf.layers.dense({ units: 64, inputShape: [1], activation: "relu" })
  );
  newModel.add(tf.layers.dense({ units: 32, activation: "relu" }));
  newModel.add(tf.layers.dense({ units: 1 }));
  newModel.compile({ loss: "meanSquaredError", optimizer: "adam" });

  await newModel.fit(xs, ys, { epochs: 1000 });

  return newModel;
};

export const predictPrice = async (model: tf.Sequential) => {
  if (!model) {
    console.error("Model is not trained yet.");
    return;
  }

  const newDate = +format(new Date("2021-01-15"), "MMdd");
  const prediction = model.predict(tf.tensor2d([[newDate]], [1, 1]));
  // @ts-expect-error проблема с типами в библиотеке
  const result = await prediction.data();
  console.log("Predicted price:", result[0]);
};
