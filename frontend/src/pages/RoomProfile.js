import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography, IconButton } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
//
import ROOMS from '../_mocks_/rooms';
import { mockImgCover } from '../utils/mockImages';
import { RoomOccupacy, RoomPreview, RoomInfo } from '../sections/@dashboard/rooms';

// ----------------------------------------------------------------------

export default function RoomProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(parseInt(id, 10));
  const { title, capacity } = ROOMS[parseInt(id, 10)];

  return (
    <Page title={`${title} | AggDetector`}>
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
            <Typography variant="h4">{`Room: ${title}`}</Typography>
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
            <RoomInfo />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <RoomOccupacy />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
