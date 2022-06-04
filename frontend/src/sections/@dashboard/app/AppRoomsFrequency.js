import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function AppRoomsFrequency() {
  const theme = useTheme();
  const [roomsOccupancy, setRoomsOccupancy] = useState([]);
  const baseChartOptions = merge(BaseOptionChart(), {
    labels: [],
    colors: [],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    noData: {
      text: 'Loading...'
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName)
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });
  const [chartOptions, setChartOptions] = useState(baseChartOptions);

  useEffect(() => {
    const fetchRoomsOccupancy = async () => {
      const {
        data: { data: rooms }
      } = await instance('/api/rooms/stats/occupancy/live');

      console.log(rooms);
      const labels = [];
      const roomOccupancyTmp = [];
      rooms.forEach((room) => {
        labels.push(room.name);
        roomOccupancyTmp.push(room.averageOccupancy || 0);
      });

      setChartOptions({ ...chartOptions, labels });
      setRoomsOccupancy(roomOccupancyTmp);
    };

    fetchRoomsOccupancy();

    setInterval(() => {
      fetchRoomsOccupancy();
    }, 180000);
  }, []);

  return (
    <Card>
      <CardHeader title="Rooms Frequency" subheader="Live" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={roomsOccupancy} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
