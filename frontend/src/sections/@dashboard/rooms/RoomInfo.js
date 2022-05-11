import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Stack, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.white,
  height: '100%'
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

RoomInfo.propTypes = {
  roomId: PropTypes.string,
  capacity: PropTypes.number,
  connected: PropTypes.bool
};

// ----------------------------------------------------------------------

export default function RoomInfo({ capacity, connected, roomId }) {
  const [airQuality, setAirQuality] = useState(0);
  const [currentCapacity, setCurrentCapacity] = useState(0);

  // TODO: Fetch current capacity and air quality over time
  useEffect(() => {
    setAirQuality(32);
    setCurrentCapacity(0);

    setInterval(() => {
      setAirQuality(32);
      setCurrentCapacity(0);
    }, 10000);
  }, []);

  return (
    <RootStyle>
      <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
        <Box>
          <IconWrapperStyle>
            <Iconify icon="fa6-solid:arrows-down-to-people" width={24} height={24} />
          </IconWrapperStyle>
          <Typography variant="h3">
            {fShortenNumber(currentCapacity)} / {fShortenNumber(capacity)}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Current Capacity
          </Typography>
        </Box>
        <Box>
          <IconWrapperStyle>
            <Iconify icon="akar-icons:air" width={24} height={24} />
          </IconWrapperStyle>
          <Typography variant="h3">{connected ? airQuality : '--'}</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            Air Quality
          </Typography>
        </Box>
      </Stack>
    </RootStyle>
  );
}
