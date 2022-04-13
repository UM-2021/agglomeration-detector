import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.white,
  height: '100%'
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '16px'
});

// ----------------------------------------------------------------------

RoomPreview.propTypes = {
  image: PropTypes.string
};

// ----------------------------------------------------------------------

export default function RoomPreview({ image }) {
  return (
    <RootStyle>
      <CoverImgStyle alt="Camera preview" src={image} />
    </RootStyle>
  );
}
