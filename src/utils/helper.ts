/**
 *  Data sets
 *
 *  {"Date":"1980-12-08","Open":0.513393,"High":0.515625,"Low":0.513393,"Close":0.513393,"Adj Close":0.023268,"Volume":117258400
 */

export const d = {
  test_times: [
    new Date('1995-12-17T00:00:00.000').getTime(),
    new Date('2018-06-25T00:00:00.000').getTime(),
  ],
  test_highs: [184.160004, 184.919998],
};

export const print = function (text: any) {
  console.log(text);
};

export const prep = function (data: any) {
  return new Promise(function (resolve, reject) {
    let dates = [],
      highs = [];
    try {
      for (let i = 0; i < data.length; i++) {
        dates.push(new Date(data[i]['Date'] + 'T00:00:00.000').getTime());
        highs.push(data[i]['Close']);
      }
    } catch (ex) {
      resolve(ex);
      console.log(ex);
    }
    return resolve({
      dates: dates,
      highs: highs,
    });
  });
};

/**
 *  TensorFlow.js helpers
 */

export const modelHelper = function (model: any) {
  let layerNames = [
    'conv1d_Conv1D1',
    'max_pooling1d_MaxPooling1D1',
    'conv1d_Conv1D2',
    'max_pooling1d_MaxPooling1D2',
    'dense_Dense1',
  ];

  console.log('MODEL SUMMARY: ');
  model.summary();

  console.log('MODEL LAYERS: ');
  for (let i = 0; i < layerNames.length; i++) {
    console.log(model.getLayer(layerNames[i]));
  }

  console.log('SHAPES BY LAYER: ');
  for (let i = 0; i < layerNames.length; i++) {
    console.log(
      'INPUT SHAPE ' +
        model.getLayer(layerNames[i]).input.shape +
        ' OUTPUT SHAPE ' +
        model.getLayer(layerNames[i]).output.shape,
    );
  }
};

export const fetchWrapper = function (url: string) {
  return new Promise(function (resolve, reject) {
    fetch(url, { method: 'GET' })
      .catch(function (err) {
        console.error('Error fetching data, check your internet connection. ' + err);
      })
      .then(function (success) {
        let r;
        try {
          //@ts-ignore
          r = success.json();
        } catch (ex) {
          console.error(ex);
        }
        return r;
      })
      .then(function (secondSuccess) {
        return resolve(secondSuccess.data);
      });
  });
};
