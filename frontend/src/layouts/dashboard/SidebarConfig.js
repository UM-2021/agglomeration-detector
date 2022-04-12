// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'rooms',
    path: '/dashboard/rooms',
    icon: getIcon('fluent:conference-room-28-filled')
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: getIcon('bxs:user-detail')
  },
  {
    title: 'logout',
    path: '/logout',
    icon: getIcon('ri:logout-circle-r-fill')
  }
];

export default sidebarConfig;
