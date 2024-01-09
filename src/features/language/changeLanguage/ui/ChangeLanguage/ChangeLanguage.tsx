import { Box, IconButton, MenuItem, Popover } from '@mui/material';
import { useState } from 'react';
import { LANGUAGES } from '../../../../../shared/config/languages';

const ChangeLanguage = () => {
  const [isOpen, setIsOpen] = useState(null);

  const handleOpen = (event) => {
    setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
        }}>
        <img src={LANGUAGES[0].icon} alt={LANGUAGES[0].label} />
      </IconButton>

      <Popover
        open={!!isOpen}
        onClose={handleClose}
        anchorEl={isOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {LANGUAGES.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === LANGUAGES[0].value}
            onClick={() => handleClose()}
            sx={{ typography: 'body2', py: 1 }}>
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default ChangeLanguage;
