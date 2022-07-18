import React from 'react';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GradientBox from 'snet-ui/GradientBox';
import { SUCCESSFUL_CLAIM_STRING } from 'utils/airdropWindows';
import LoadingButton from 'snet-ui/LoadingButton';
import useStyles from './styles';

type ClaimSuccessModalProps = {
  showModal: boolean;
  currentWindow: number;
  totalWindow: number;
  onCloseModal: () => void;
};

const ClaimSuccessModal = ({ showModal, currentWindow, totalWindow, onCloseModal }: ClaimSuccessModalProps) => {
  const classes = useStyles();
  return (
    <Modal
      open={showModal}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
      className={classes.successModal}
    >
      <GradientBox className={classes.successGradientBox}>
        <img src="/images/Parachute.png" alt="SingularityNET" />
        <Box>
          <Typography align="center" variant="h3">
            Congratulations
          </Typography>
          <Typography
            align="center"
            variant="h5"
          >{`${SUCCESSFUL_CLAIM_STRING} ${currentWindow} / ${totalWindow}`}</Typography>
        </Box>
        <LoadingButton variant="contained" onClick={onCloseModal}>
          AWESOME!
        </LoadingButton>
      </GradientBox>
    </Modal>
  );
};

export default ClaimSuccessModal;
