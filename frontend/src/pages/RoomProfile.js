import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  LinearProgress,
  Box,
  Card,
  styled
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
//
// import ROOMS from '../_mocks_/rooms';

import { mockImgCover } from '../utils/mockImages';
import { RoomOccupacy, RoomPreview, RoomInfo } from '../sections/@dashboard/rooms';
import instance from '../middlewares/axios';
import Loader from '../components/Loader';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.white,
  height: '100%'
}));

export default function RoomProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [occupacy, setOccupacy] = useState(0);
  const [room, setRoom] = useState(null);
  // const { title, capacity, maxCapacity } = ROOMS[parseInt(id, 10)];

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await instance(`/api/rooms/${id}`);
      const room = data.data.data;
      if (room) setRoom(room);
      setLoading(false);

      // TODO: Fetch current capacity by X seconds and calculate occupacy
      setInterval(() => {
        setOccupacy((1 / room.capacity) * 100);
      }, 10000);
    };

    fetchRoom();
  }, []);

  if (loading) return <Loader />;

  return (
    <Page title={`${room.name} | AggDetector`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <IconButton
              size="large"
              edge="start"
              disableRipple
              style={{ backgroundColor: 'transparent' }}
              onClick={() => navigate(-1)}
            >
              <Iconify icon="eva:arrow-ios-back-outline" fontSize="inherit" color="black" />
            </IconButton>
            <Typography variant="h4">{`Room: ${room.name}`}</Typography>
          </Stack>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:edit-2-fill" />}
          >
            Edit Room
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <RoomPreview image={mockImgCover(1)} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <RoomInfo roomdId={id} capacity={room.capacity} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <RootStyle sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    sx={{ height: 10, borderRadius: 5 }}
                    variant="determinate"
                    value={occupacy}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${Math.round(
                    occupacy
                  )}%`}</Typography>
                </Box>
              </Box>
            </RootStyle>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <RoomOccupacy />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
