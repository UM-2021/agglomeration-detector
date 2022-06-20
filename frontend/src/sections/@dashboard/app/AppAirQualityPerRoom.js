import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
import instance from '../../../middlewares/axios';
import Loader from '../../../components/Loader';

// ----------------------------------------------------------------------

const CHART_TYPES = ['line', 'column', 'area'];
// const CHART_DATA = [
//   {
//     name: 'Room A',
//     type: 'column',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//   },
//   {
//     name: 'Room B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//   },
//   {
//     name: 'Room C',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//   }
// ];

const createSeries = (name, type, data) => {
  let strokeWidth;
  let fillType;

  switch (type) {
    case 'column':
      strokeWidth = 0;
      fillType = 'solid';
      break;

    case 'line':
      strokeWidth = 3;
      fillType = 'solid';
      break;

    case 'area':
    default:
      type = 'area';
      strokeWidth = 2;
      fillType = 'gradient';
      break;
  }

  return {
    strokeWidth,
    fillType,
    series: { name, type, data }
  };
};

export default function AppAirQualityPerRoom() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseChartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    xaxis: { type: 'datetime' },
    noData: {
      text: 'Loading...'
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} ppm`;
          }
          return y;
        }
      },
      x: {
        format: 'dd MMM HH:mm'
      }
    }
  });
  const [chartOptions, setChartOptions] = useState(baseChartOptions);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data }
      } = await instance(`/api/rooms/stats/co2/monthly`);

      const seriesData = [];
      const strokeWidths = [];
      const fillTypes = [];
      let labels = [];

      data.forEach((room, idx) => {
        labels = [...labels, ...room.data.map((d) => new Date(d[0]).getTime())];
        const values = room.data.map((d) => d[1].toFixed(0));
        const { series, strokeWidth, fillType } = createSeries(room.name, CHART_TYPES[idx % CHART_TYPES.length], values);
        seriesData.push(series);
        strokeWidths.push(strokeWidth);
        fillTypes.push(fillType);
      });

      setSeries(seriesData);
      setChartOptions((co) => ({ ...co, labels, stroke: { width: strokeWidths }, fill: { type: fillTypes } }));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader title="Air Quality Per Room" subheader="Over the last month" />
      <Box sx={{ p: 3 }} dir="ltr">
        {loading ? <Loader /> : <ReactApexChart series={series} options={chartOptions} height={350} />}
      </Box>
    </Card>
  );
}
