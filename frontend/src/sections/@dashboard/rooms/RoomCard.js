import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Typography, CardContent, alpha, Button } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

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

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function RoomCard({ room, index }) {
  const { cover, title, capacity, alerts, createdAt } = room;

  const ROOM_INFO = [
    { number: capacity, icon: 'fluent:people-audience-20-filled' },
    { number: alerts, icon: 'eva:alert-triangle-fill' }
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
          <IconWrapperStyle color={cover}>
            <Iconify icon="fluent:conference-room-28-filled" width={18} height={18} />
          </IconWrapperStyle>

          <CoverStyle style={{ backgroundColor: cover }} />
        </CardMediaStyle>

        <CardContent sx={{ pt: 4 }}>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(createdAt)}
          </Typography>

          <TitleStyle
            to={`${index}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {title}
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
                  <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                </Box>
              ))}
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to={`/dashboard/rooms/${index}`}
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
