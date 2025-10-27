import * as tf from '@tensorflow/tfjs';
import { format } from 'date-fns';

import { CONVERT_STOCKS } from '../pages/stocks/index.constant';
import { URLS, BASE_URL } from '../api/requests/requests.constant';
import { fitLinearRegression } from './trend';
import { ApiClient } from '../api/api-client';

import type { StockNames, Stocks } from '../store/store.interface';

export default async (
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
					onEpochEnd(epoch: number, logs: any) {
						console.log(epoch, logs);
					},
				},
			],
		});
		model = newModel;
	}

	if (model) {
		// model.save('downloads://model');
	}

	const maes = await getMaes(data, model);

	return { maes, model };
};

const getDataForTraining = async (data: Stocks[]) => {
	console.log(data);
	let counter = 0;
	let slope = 0;
	const countRestart = 80;

	const apiClient = new ApiClient();
	const moexIndexes = await apiClient.prediction.getMoexIndexesByPeriod({
		startDate: new Date('2016-01-01'),
		endDate: new Date(),
	});

	const normalizedData = await Promise.all(
		data.map(async (info, index) => {
			if (counter === countRestart) {
				counter = 0;
			}

			if (counter === 0) {
				const startDate = info.date;
				const endDate =
					data[index + countRestart]?.date ?? data[data.length - 1].date;
				const moexes = moexIndexes.data.filter(moex => {
					if (moex.date >= startDate && moex.date <= endDate) {
						console.log(moex.date, moex.index);
						return true;
					}
					return false;
				});

				const indexes = moexes.map(el => +el.index);
				const linearRegression = fitLinearRegression(indexes);
				console.log(indexes, slope, endDate);
				slope = linearRegression.slope ? linearRegression.slope : slope;
			}

			counter++;
			return {
				date: +format(info.date, 'yyMMdd'),
				price: +info.index,
				nameCode: CONVERT_STOCKS.TO_ENUM[info.name as StockNames],
				slope: Math.round(slope),
			};
		}),
	);

	const inputs = normalizedData.map(item => [
		...transformDate(item!.date),
		item.nameCode,
		item.slope,
	]);
	const output = normalizedData.map(item => item!.price);
	console.log(inputs);
	return { inputs, output };
};

const getMaes = async (
	data: Stocks[],
	model: tf.Sequential | tf.LayersModel,
) => {
	const testData = data.slice(Math.round(data.length * 0.7), data.length);
	const trainingData = await getDataForTraining(testData);

	const predictionsOnTest = trainingData.inputs.map(input => {
		const inputTensor = tf.tensor2d([input], [1, 5]);
		const prediction = model?.predict(inputTensor) as tf.Tensor;
		const predictionValue = prediction.dataSync()[0];

		return { value: predictionValue, nameCode: input[3] };
	});

	const absoluteDiff = new Map<number, number[]>();
	for (let i = 0; i < testData.length; i++) {
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

export function transformDate(date: number) {
	const year = Math.floor(date / 10000);
	const month = Math.floor((date % 10000) / 100);
	const day = date % 100;
	return [year, month, day];
}
