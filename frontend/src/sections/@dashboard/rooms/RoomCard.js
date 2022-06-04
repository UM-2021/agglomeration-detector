import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Typography, CardContent, alpha, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% / 3)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverStyle = styled('div')({
  top: 0,
  width: '100%',
  height: '100%',
  position: 'absolute'
});

const IconWrapperStyle = styled('div')(({ theme, color }) => ({
  borderRadius: '50%',
  width: 32,
  height: 32,
  position: 'absolute',
  zIndex: 9,
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color,
  backgroundImage: `linear-gradient(135deg, ${alpha(color, 0)} 0%, ${alpha(color, 0.24)} 100%)`
}));

// ----------------------------------------------------------------------

const COLORS = ['#FFC107', '#00AB55', '#1890FF', '#FFC0CB', '#FF4842', '#94D82D'];

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function RoomCard({ room, index }) {
  const { _id: id, name, capacity, createdAt } = room;
  const [currentCapacity, setCurrentCapacity] = useState(0);
  const [activeAlerts, setActiveAlerts] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const alertsReq = instance(`/api/alerts/room/${id}?handled=false`);
      const capacityReq = instance(`/api/rooms/${id}/stats/occupancy/live`);

      const [
        {
          data: { results: alerts }
        },
        {
          data: {
            data: { averageOccupancy }
          }
        }
      ] = await Promise.all([alertsReq, capacityReq]);

      setActiveAlerts(alerts);
      setCurrentCapacity(averageOccupancy || 0);
    };

    fetchData();
  });
  console.log(currentCapacity);
  const ROOM_INFO = [
    {
      number: `${Math.round((currentCapacity / capacity) * 100)} %`,
      icon: 'fluent:people-audience-20-filled'
    },
    { number: activeAlerts, icon: 'eva:alert-triangle-fill' }
  ];

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute'
            }}
          />
          <IconWrapperStyle color={COLORS[index % COLORS.length]}>
            <Iconify icon="fluent:conference-room-28-filled" width={18} height={18} />
          </IconWrapperStyle>

          <CoverStyle style={{ backgroundColor: COLORS[index % COLORS.length] }} />
        </CardMediaStyle>

        <CardContent sx={{ pt: 4 }}>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <TitleStyle to={id} color="inherit" variant="subtitle2" underline="hover" component={RouterLink}>
            {name}
          </TitleStyle>

          <InfoStyle>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {ROOM_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: index === 0 ? 0 : 1.5
                  }}
                >
                  <Iconify icon={info.icon} sx={{ width: 24, height: 24, mr: 0.5 }} />
                  <Typography variant="caption">{info.number}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/dashboard/rooms/${id}`}
              endIcon={<Iconify icon="akar-icons:arrow-right" />}
            >
              Visit
            </Button>
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
