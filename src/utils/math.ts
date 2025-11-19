export const countMeasureOfError = (data: number[]) => {
  const errors = [];
  const sortedData = data.sort((a, b) => a - b).slice(0, data.length * 0.2);
  const cVar =
    (sortedData.reduce((acc, el) => el + acc, 0) / data.length) * 0.2;

  for (let i = 0; i < 1; i += 0.1) {
    const coefA = +i.toFixed(1);
    for (let j = 0; j < 1; j += 0.1) {
      const coefB = +j.toFixed(1);

      const mathWait =
        data
          .map(el => ((el * 2.71) / coefB) * -1)
          .reduce((acc, el) => acc + el, 0) / data.length;
      const ln = Math.log(Math.abs(mathWait));

      const error = coefA * coefB * ln - (1 - coefA) * cVar;
      if (error) {
        errors.push(error);
      }
    }
  }

  return errors;
};
