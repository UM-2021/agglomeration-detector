import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const COLORS = ['#FFC107', '#00AB55', '#1890FF', '#FFC0CB', '#FF4842', '#94D82D'];

const ROOM_TITLES = ['Room A', 'Room B', 'Room C', 'Z Room'];

const rooms = [...Array(4)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: COLORS[index],
  title: ROOM_TITLES[index],
  createdAt: faker.date.past(),
  capacity: faker.datatype.number({ min: 0, max: 30 }),
  maxCapacity: faker.datatype.number({ min: 20, max: 30 }),
  alerts: faker.datatype.number({ min: 0, max: 10 })
}));

export default rooms;
