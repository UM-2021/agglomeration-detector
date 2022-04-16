import PropTypes from 'prop-types';
// material
import { Box, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

Loader.propTypes = {
  sx: PropTypes.object
};

export default function Loader({ sx }) {
  return (
    <Box sx={{ display: 'flex', ...sx }}>
      <CircularProgress />
    </Box>
  );
}
