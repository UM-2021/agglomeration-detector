// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import instance from '../../../middlewares/axios';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppCamerasCount() {
  const [camerasCount, setCamerasCount] = useState(0);

  useEffect(() => {
    const fetchCamerasCount = async () => {
      const { data } = await instance('/api/rooms');
      const rooms = data.data;

      if (rooms) setCamerasCount(rooms.length);
    };

    fetchCamerasCount();
  }, []);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="icon-park-outline:surveillance-cameras" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(camerasCount)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Cameras Count
      </Typography>
    </RootStyle>
  );
}
