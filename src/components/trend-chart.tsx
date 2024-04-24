// @ts-ignore
import React from 'react';
import Chart from 'react-google-charts';

const TrendOptions = {
  title: 'Trend Line',
  legend: 'none',
  trendlines: { 0: {}, 1: {} },
  tooltip: { trigger: 'none' },
  format: 'dd-MMM-yyyy',
  series: [{ color: '#6a00ff' }],
};

export const TrendChart = ({ data }: { data: any[] }) => {
  if (data.length > 1) {
    return (
      <div>
        <Chart
          width={'600px'}
          height={'350px'}
          chartType="ScatterChart"
          loader={<div>Loading Chart</div>}
          data={data}
          options={TrendOptions}
          columns={[
            { type: 'number', label: 'Index' },
            { type: 'date', label: 'Date' },
          ]}
        />
      </div>
    );
  }
};
