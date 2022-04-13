import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
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
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'alert1' && 'primary.main') ||
              (type === 'alert2' && 'success.main') ||
              (type === 'alert3' && 'info.main') ||
              (type === 'alert4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppAlertTimeline() {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Alert Timeline" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
