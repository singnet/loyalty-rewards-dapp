import { CircularProgress, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

type LoaderProps = {
  loader: { loading: boolean; message: string | null };
};

const loaderStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  px: 4,
  py: 8,
  width: '410px',
  boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.2)',
  borderRadius: '4px',
};

const LoaderModal = ({ loader }: LoaderProps) => (
  <Modal open={loader.loading} aria-labelledby="loader-modal-title" aria-describedby="loader-modal-description">
    <Box sx={loaderStyle} alignItems="center" justifyContent="center" display="flex" flexDirection="column">
      <CircularProgress />
      <Typography id="loader-modal-description" fontSize={14} sx={{ mt: 2 }}>
        {loader.message}
      </Typography>
    </Box>
  </Modal>
);

export default LoaderModal;
