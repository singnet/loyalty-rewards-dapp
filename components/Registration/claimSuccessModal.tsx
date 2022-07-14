import React from 'react';
import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import GradientBox from 'snet-ui/GradientBox';
import colors from 'snet-ui/Theme/colors';
import { SUCCESSFUL_CLAIM_STRING } from 'utils/airdropWindows';
import LoadingButton from 'snet-ui/LoadingButton';

type ClaimSuccessModalProps = {
  showModal: boolean;
  currentWindow: number;
  totalWindow: number;
  onCloseModal: () => void;
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '50%',
  boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.2)',
  borderRadius: '4px',
};

const ClaimSuccessModal = ({ showModal, currentWindow, totalWindow, onCloseModal }: ClaimSuccessModalProps) => (
  <Modal open={showModal} aria-labelledby="success-modal-title" aria-describedby="success-modal-description">
    <Box>
      <GradientBox sx={modalStyle} $background="bgGradientHighlight">
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/images/Parachute.png" alt="SingularityNET" height="auto" width="100%" />
          </Box>
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
              <Typography align="center" fontSize="20px" fontWeight="600" variant="h5" color="text.secondary" pb={1.5}>
                {`${SUCCESSFUL_CLAIM_STRING} ${currentWindow} / ${totalWindow}`}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={5}>
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

export default ClaimSuccessModal;
