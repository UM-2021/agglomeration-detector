// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppPeopleCount() {
  const [liveOccupancy, setLiveOccupancy] = useState(0);
  useEffect(() => {
    const fetchRoomsOccupancy = async () => {
      const {
        data: { data: rooms }
      } = await instance('/api/rooms/stats/occupancy/live');

      const total = rooms.reduce((prev, curr) => prev + curr.averageOccupancy, 0);
      setLiveOccupancy(total);
    };

    fetchRoomsOccupancy();
    setInterval(() => {
      fetchRoomsOccupancy();
    }, 180000);
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="fa6-solid:arrows-down-to-people" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(liveOccupancy)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Live People Count
      </Typography>
    </RootStyle>
  );
}
