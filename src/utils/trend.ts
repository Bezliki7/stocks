/**
 * Вычисление коэффициента наклона (slope) линейной регрессии
 */
export function fitLinearRegression(data: number[]) {
  const n = data.length;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += data[i];
    sumXY += i * data[i];
    sumX2 += i ** 2;
  }

  // Вычисление коэффициентов линейной регрессии (a и b)
  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);

  return { slope: a };
}

/**
 * Определение типа тренда
 */
export const determineTrendType = (data: number[]) => {
  const linearRegression = fitLinearRegression(data);

  const slope = linearRegression.slope;

  if (slope > 0) {
    return 'Восходящий тренд';
  } else if (slope < 0) {
    return 'Нисходящий тренд';
  } else {
    return 'Горизонтальный тренд';
  }
};
