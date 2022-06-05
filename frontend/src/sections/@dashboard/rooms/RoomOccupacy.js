import { merge } from 'lodash';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

// const CHART_DATA = [
//   {
//     name: 'Room A',
//     type: 'area',
//     data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
//   }
// ];

RoomOccupacy.propTypes = {
  roomId: PropTypes.string,
  roomName: PropTypes.string
};

export default function RoomOccupacy({ roomId, roomName }) {
  const [persons, setPersons] = useState([{ name: roomName, type: 'area', data: [] }]);
  const basechartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['gradient'] },
    xaxis: {
      type: 'datetime'
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
  const [chartOptions, setChartOptions] = useState(basechartOptions);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data }
      } = await instance(`/api/rooms/${roomId}/stats/occupancy/monthly`);

      const labels = data.map((d) => new Date(d[0]).getTime());
      const values = data.map((d) => d[1].toFixed(0));

      setChartOptions({ ...chartOptions, labels });
      setPersons([{ name: roomName, type: 'area', data: values }]);
    };

    fetchData();
  }, [roomId, roomName]);

  return (
    <Card>
      <CardHeader title="Persons" subheader="Over the last month" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={persons} options={chartOptions} height={288} />
      </Box>
    </Card>
  );
}
