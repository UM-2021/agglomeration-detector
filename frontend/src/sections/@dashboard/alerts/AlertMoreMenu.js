import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import instance from '../../../middlewares/axios';

// ----------------------------------------------------------------------

AlertMoreMenu.propTypes = {
  id: PropTypes.string,
  handleResolve: PropTypes.func
};

export default function AlertMoreMenu({ id, handleResolve }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="bi:clipboard2-check-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Resolve"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={handleResolve}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
