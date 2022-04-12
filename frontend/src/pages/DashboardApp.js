// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppPeopleCount,
  AppCamerasCount,
  AppAlertTimeline,
  AppRoomsFrequency,
  AppPeoplePerRoom,
  AppAlertsEmitted,
  AppAirQualityPerRoom
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | AggDetector">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppCamerasCount />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppPeopleCount />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppAlertsEmitted />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppPeoplePerRoom />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppRoomsFrequency />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAirQualityPerRoom />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppAlertTimeline />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
