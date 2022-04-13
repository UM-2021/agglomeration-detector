import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
//
import ROOMS from '../_mocks_/rooms';
import { RoomCard } from '../sections/@dashboard/rooms';

// ----------------------------------------------------------------------

export default function Room() {
  return (
    <Page title="Rooms | AggDetector">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Rooms
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Room
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {ROOMS.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
