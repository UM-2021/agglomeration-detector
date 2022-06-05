import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useState } from 'react';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

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
    case 'area':
      strokeWidth = 2;
      fillType = 'gradient';
      break;
    case 'line':
      strokeWidth = 3;
      fillType = 'solid';
      break;

    default:
      break;
  }

  return {
    strokeWidth,
    fillType,
    series: { name, type, data }
  };
};

export default function AppPeoplePerRoom() {
  const [series, setSeries] = useState([]);
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
            return `${y.toFixed(0)} persons`;
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
      } = await instance(`/api/rooms/stats/occupancy/monthly`);

      const seriesData = [];
      const strokeWidths = [];
      const fillTypes = [];

      data.forEach((room) => {
        const serie = createSeries(room.name, 'line', room.data);
        console.log(room);
        seriesData.push(serie.series);
        strokeWidths.push(serie.strokeWidth);
        fillTypes.push(serie.fillType);
      });

      setSeries(seriesData);
      setChartOptions((co) => ({ ...co, stroke: { width: strokeWidths }, fill: { type: fillTypes } }));
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader title="Persons Per Room" subheader="Over the last month" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={series} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
