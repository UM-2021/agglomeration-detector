import { useEffect, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(theme.palette.error.dark, 0.24)} 100%)`
}));

// ----------------------------------------------------------------------

export default function AppAlertsEmitted() {
  const [activeAlerts, setActiveAlerts] = useState(0);

  useEffect(() => {
    const fetchActiveAlerts = async () => {
      const { data } = await instance('/api/alerts?handled=false');
      const alerts = data.data;

      if (alerts) setActiveAlerts(alerts.length);
    };

    fetchActiveAlerts();
  }, []);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="ant-design:alert-filled" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(activeAlerts)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Active Alerts
      </Typography>
    </RootStyle>
  );
}
