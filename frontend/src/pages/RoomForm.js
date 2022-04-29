import { Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import RoomNewEditForm from '../sections/@dashboard/rooms/RoomNewEditForm';

export default function RoomForm() {
  const navigate = useNavigate();
  // New or Edit
  const formName = window.location.href
    .split('/')
    .pop()
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <Page title={`${formName} Room | AggDetector`}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {`${formName} Room`}
          </Typography>
          <Button color="secondary" variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>

        <RoomNewEditForm />
      </Container>
    </Page>
  );
}
