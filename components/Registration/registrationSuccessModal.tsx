import React from 'react';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GradientBox from 'snet-ui/GradientBox';
import colors from 'snet-ui/Theme/colors';
import { SUCCESSFUL_REGISTRATION_STRING } from 'utils/airdropWindows';
import LoadingButton from 'snet-ui/LoadingButton';
import useStyles from './styles';

type RegistrationSuccessModalProps = {
  showModal: boolean;
  registrationId: string;
  onCloseModal: () => void;
};

const RegistrationSuccessModal = ({ showModal, registrationId, onCloseModal }: RegistrationSuccessModalProps) => {
  const classes = useStyles();

  const addEllipsisInBetweenString = (str) => `${str.substr(0, 15)}...${str.substr(str.length - 15)}`;

  const copyIdToCipboard = () => {
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(registrationId);
    }
  };
  return (
    <Modal open={showModal} aria-labelledby="success-modal-title" aria-describedby="success-modal-description" className={classes.registrationSuccessModal}>
      <GradientBox className={classes.registrationSuccessGradientBox}>
        <img src="/images/Congratulations.svg" alt="SingularityNET" />
        <Box>
          <Typography variant="h2">Congratulations</Typography>
          <Typography variant="h4">{SUCCESSFUL_REGISTRATION_STRING}</Typography>
          <Box onClick={copyIdToCipboard}>
            <Typography align="center">
              Registration ID: {addEllipsisInBetweenString(registrationId)}
              <ContentCopyIcon />
            </Typography>
          </Box>
          <LoadingButton variant="contained" onClick={onCloseModal}>
            AWESOME!
          </LoadingButton>
        </Box>
      </GradientBox>
    </Modal>
  );
};

export default RegistrationSuccessModal;
