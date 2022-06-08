import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent, Chip, Badge, Icon, Stack } from '@mui/material';
import { Timeline, TimelineItem, TimelineContent, TimelineConnector, TimelineSeparator, TimelineDot } from '@mui/lab';
// utils
import instance from '../../../middlewares/axios';
import Loader from '../../../components/Loader';
import Iconify from '../../../components/Iconify';
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    title: 'Room A: Limit exceeded',
    time: faker.date.past(),
    type: 'alert1'
  },
  {
    title: 'Room B: Limit exceeded',
    time: faker.date.past(),
    type: 'alert2'
  },
  {
    title: 'Room C: Bad Air quality',
    time: faker.date.past(),
    type: 'alert3'
  },
  {
    title: 'Room B: Bad Air quality',
    time: faker.date.past(),
    type: 'alert4'
  },
  {
    title: 'Room C: Limit excedeed',
    time: faker.date.past(),
    type: 'alert5'
  }
];

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  isLast: PropTypes.bool
};

const TYPES = {
  capacity: 'Maximum capacity traspassed',
  air: 'Bad air quality'
};

function OrderItem({ item, index, isLast }) {
  const {
    type,
    createdAt,
    room: { name },
    handled
  } = item;

  const formttedType = type === 'capacity' ? TYPES.capacity : type === 'air' ? TYPES.air : 'Something went wrong';

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (index === 0 && 'primary.main') ||
              (index === 1 && 'success.main') ||
              (index === 2 && 'info.main') ||
              (index === 3 && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>{`${name}: `}</Typography>
          <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'light' }}>{`${formttedType}`}</Typography>
          <Iconify width={11} height={11} icon="akar-icons:circle-fill" sx={{ color: handled ? 'success.main' : 'error.main' }} />
        </Stack>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {fDateTime(createdAt)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppAlertTimeline() {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await instance('/api/alerts?limit=5');
      const fetchedAlerts = data.data;

      setAlerts(fetchedAlerts);
      setLoading(false);
    };

    fetchAlerts();
  }, []);

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Alert Timeline" />
      {loading ? (
        <Loader />
      ) : (
        <CardContent>
          <Timeline>
            {alerts.map((item, index) => (
              <OrderItem key={item.id} index={index} item={item} isLast={index === alerts.length - 1} />
            ))}
          </Timeline>
        </CardContent>
      )}
    </Card>
  );
}
