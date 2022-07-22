import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useStyles from './styles';

type LoaderProps = {
  loader: { loading: boolean; message: string | null };
};

const LoaderModal = ({ loader }: LoaderProps) => {
  const classes = useStyles();
  return (
    <Modal open={loader.loading} aria-labelledby="loader-modal-title" aria-describedby="loader-modal-description">
      <Box className={classes.loaderModal}>
        <img src="/images/Curve-Loading.gif" alt="Loader" />
        <Typography id="loader-modal-description">
          {loader.message}
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoaderModal;
