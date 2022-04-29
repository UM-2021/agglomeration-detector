import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import Loader from '../components/Loader';

//
// import ROOMS from '../_mocks_/rooms';
import { RoomCard } from '../sections/@dashboard/rooms';
import instance from '../middlewares/axios';

// ----------------------------------------------------------------------

export default function Room() {
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await instance('/api/rooms');
      const rooms = data.data;

      if (rooms) setRooms(rooms);
      setLoading(false);
    };

    fetchRooms();
  }, []);

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
            to="new"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Room
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {loading ? (
            <Grid item>
              <Loader />
            </Grid>
          ) : rooms.length === 0 ? (
            <Grid item>
              <Typography variant="p" gutterBottom>
                No rooms registered.
              </Typography>
            </Grid>
          ) : (
            rooms.map((room, index) => <RoomCard key={room._id} room={room} index={index} />)
          )}
        </Grid>
      </Container>
    </Page>
  );
}
