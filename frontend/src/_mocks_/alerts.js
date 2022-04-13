import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const alerts = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  roomName: faker.name.findName(),
  status: sample(['active', 'handled']),
  type: sample(['Bad Air Quality', 'Max Capacity reached'])
}));

export default alerts;
