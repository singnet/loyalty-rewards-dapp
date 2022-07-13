import React from 'react';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { VoidSigner } from 'ethers';
import GradientBox from 'snet-ui/GradientBox';
import colors from 'snet-ui/Theme/colors';
import { SUCCESSFUL_REGISTRATION_STRING } from 'utils/airdropWindows';
import LoadingButton from 'snet-ui/LoadingButton';

type RegistrationSuccessModalProps = {
  showModal: boolean;
  registrationId: string;
  onCloseModal: () => VoidSigner;
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  px: 4,
  py: 8,
  width: '50%',
  boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.2)',
  borderRadius: '4px',
};

const RegistrationSuccessModal = ({ showModal, registrationId, onCloseModal }: RegistrationSuccessModalProps) => {
  const copyIdToCipboard = () => {
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(registrationId);
      //   setCopied(true);
    }
  };
  return (
    <Modal open={showModal} aria-labelledby="success-modal-title" aria-describedby="success-modal-description">
      <Box>
        <GradientBox sx={modalStyle} $background="bgGradientHighlight">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/images/Congratulations.png" alt="SingularityNET" height="160px" width="170px" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, pb: 3 }}>
            <Box>
              <Typography
                align="center"
                variant="h3"
                pb={1.5}
                fontSize="32px"
                fontWeight="bold"
                sx={{ color: `${colors.PENDING_BORDER}` }}
              >
                Congratulations
              </Typography>
              <Box mt={2}>
                <Typography
                  align="center"
                  fontSize="20px"
                  fontWeight="600"
                  variant="h5"
                  color="text.secondary"
                  pb={1.5}
                >
                  {SUCCESSFUL_REGISTRATION_STRING}
                </Typography>
              </Box>
              <Box onClick={copyIdToCipboard} mt={3}>
                <Typography align="center" variant="body2" color="textAdvanced.secondary" fontSize="14px">
                  {`Registration ID: ${registrationId}`}
                  <ContentCopyIcon sx={{ ml: 1, color: 'textAdvanced.secondary', height: 19, width: 16 }} />
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={5}>
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: 'capitalize', width: '210px', fontWeight: 600, fontSize: 14 }}
                  onClick={onCloseModal}
                >
                  AWESOME!
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </GradientBox>
      </Box>
    </Modal>
  );
};

export default RegistrationSuccessModal;
