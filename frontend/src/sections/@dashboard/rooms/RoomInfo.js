import PropTypes from 'prop-types';
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
  paddingBottom: theme.spacing(1),
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
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`
}));

// ----------------------------------------------------------------------

RoomInfo.propTypes = {
  capacity: PropTypes.number,
  connected: PropTypes.bool,
  lastUpdated: PropTypes.string,
  airQuality: PropTypes.number,
  currentCapacity: PropTypes.number
};

// ----------------------------------------------------------------------

export default function RoomInfo({ currentCapacity, airQuality, capacity, lastUpdated, connected }) {
  return (
    <RootStyle>
      <Stack flexDirection="column">
        <Stack flexDirection="row" justifyContent="space-around" alignItems="center">
          <Box>
            <IconWrapperStyle>
              <Iconify icon="fa6-solid:arrows-down-to-people" width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h3">{connected ? `${fShortenNumber(currentCapacity)} / ${fShortenNumber(capacity)}` : '--'}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Current Capacity
            </Typography>
          </Box>
          <Box>
            <IconWrapperStyle>
              <Iconify icon="akar-icons:air" width={24} height={24} />
            </IconWrapperStyle>
            <Typography variant="h3">{connected ? `${airQuality} ppm` : '--'}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              Air Quality
            </Typography>
          </Box>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end" mt={3}>
          <Box>
            <Typography variant="caption" sx={{ color: 'gray' }}>
              {`Last Updated at: ${lastUpdated}`}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
