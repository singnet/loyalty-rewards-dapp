import React, { useMemo, useState, useEffect } from 'react';
import GradientBox from '../../snet-ui/GradientBox';
import Typography from '@mui/material/Typography';
import FlipCountdown from '../../snet-ui/FlipClock/Countdown';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import InfoIcon from '@mui/icons-material/Info';
import History from '../../snet-ui/History';
import {
  AirdropWindow,
  WindowStatus,
  windowStatusActionMap,
  windowStatusLabelMap,
  windowStateMap,
  AIRDROP_TOKEN_DIVISOR,
  AIRDROP_TOKEN_SYMBOL,
} from '../../utils/airdropWindows';
import Alert, { AlertColor } from '@mui/material/Alert';
import LoadingButton from '../../snet-ui/LoadingButton';
import Link from '@mui/material/Link';
import styles from './style.module.css';
import StatusBadge from './StatusBadge';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { checkDateIsBetween, getDateInStandardFormat } from 'utils/date';
import Container from '@mui/material/Container';
import moment from 'moment';
import { cardanoSupportingWallets } from 'utils/constants/cardanoWallet';
import useInjectableWalletHook from '../../libraries/useInjectableWalletHook';
import { useAppDispatch, useAppSelector } from 'utils/store/hooks';
import { AirdropStatusMessage, UserEligibility } from 'utils/constants/CustomTypes';
import { setAirdropStatus } from 'utils/store/features/airdropStatusSlice';
import { AlertTypes } from 'utils/constants/alert';
import SnetAlert from '../../components/snet-alert';
import LoaderModal from 'components/Registration/loaderModal';

type HistoryEvent = {
  label: string;
  value: string;
};

type StakeInfo = {
  claimableTokensToWallet: string;
  isStakable: boolean;
  tokenName: string;
  stakableTokens: string;
  isLoading: boolean;
};

type AirdropRegistrationProps = {
  windowOrder: number;
  totalWindows: number;
  airdropWindowTotalTokens?: number;
  endDate: Moment;
  onRegister: (cardanoAddress: string) => void;
  onViewSchedule: () => void;
  onViewRules: () => void;
  history: HistoryEvent[];
  onClaim: () => void;
  onAutoStake: () => void;
  airdropWindowStatus?: WindowStatus;
  uiAlert: { type: AlertColor; message: string };
  activeWindow?: AirdropWindow;
  stakeInfo: StakeInfo;
  airdropWindowrewards: number;
  isRegistered: boolean;
  setUiAlert: ({ type, message }: { type: AlertColor; message: any }) => void;
  userEligibility: UserEligibility;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '50%',
};

export default function AirdropRegistration({
  windowOrder,
  totalWindows,
  airdropWindowTotalTokens,
  endDate,
  onRegister,
  onViewRules,
  onViewSchedule,
  history,
  onClaim,
  onAutoStake,
  stakeInfo,
  airdropWindowStatus,
  uiAlert,
  activeWindow,
  airdropWindowrewards,
  isRegistered,
  setUiAlert,
  userEligibility,
}: AirdropRegistrationProps) {
  const [registrationLoader, setRegistrationLoader] = useState(false);
  const [claimLoader, setClaimLoader] = useState(false);
  const [stakeModal, setStakeModal] = useState(false);

  const formattedDate = useMemo(() => getDateInStandardFormat(endDate), [endDate]);
  const { connectWallet, getChangeAddress } = useInjectableWalletHook(cardanoSupportingWallets);
  const { cardanoWalletAddress } = useAppSelector((state) => state.wallet);
  const { airdropStatusMessage } = useAppSelector((state) => state.airdropStatus);

  const dispatch = useAppDispatch();

  const toggleStakeModal = () => {
    setStakeModal(!stakeModal);
  };

  const handleClaimClick = async () => {
    try {
      setClaimLoader(true);
      await onClaim();
    } finally {
      setClaimLoader(false);
    }
  };

  const handleStakeClick = async () => {
    try {
      toggleStakeModal();
      setClaimLoader(true);
      await onAutoStake();
    } finally {
      setClaimLoader(false);
    }
  };

  const handleMapCardanoWallet = async () => {
    setRegistrationLoader(true);
    try {
      await connectWallet('nami');
      const cardanoAddress = await getChangeAddress();
      await onRegister(cardanoAddress);
    } catch (error) {
      console.error('Error connectCardanoWallet=====:', error);
      setUiAlert({
        type: AlertTypes.error,
        message: error?.message || error?.info,
      });
      dispatch(setAirdropStatus(AirdropStatusMessage.WALLET_ACCOUNT_ERROR));
    } finally {
      setRegistrationLoader(false);
    }
  };

  if (!activeWindow) {
    return null;
  }

  const now = moment.utc(new Date());
  const isClaimActive = checkDateIsBetween(
    moment.utc(activeWindow?.airdrop_window_claim_start_period),
    moment.utc(activeWindow?.airdrop_window_claim_end_period),
    now
  );

  const isRegistrationActive = checkDateIsBetween(
    moment.utc(activeWindow?.airdrop_window_registration_start_period),
    moment.utc(activeWindow?.airdrop_window_registration_end_period),
    now
  );

  const windowName = windowStatusLabelMap[activeWindow?.airdrop_window_status ?? ''];
  const windowAction = windowStatusActionMap[activeWindow?.airdrop_window_status ?? ''];

  return (
    <>
      <Modal
        open={stakeModal}
        onClose={toggleStakeModal}
        aria-labelledby="stake-modal-title"
        aria-describedby="stake-modal-description"
      >
        <Box sx={{ ...style, flexGrow: 1 }}>
          {/* <Typography id="stake-modal-title" variant="h6" component="h2">
            Select Your Stake Type
          </Typography>
          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <Typography id="stake-modal-description" variant="p">
              Please select the SingularityDAO stake pool for your airdrop reward.
            </Typography>
          </Box> */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" color="text.primary">
                Tokens to be staked
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">
                {`${Number(stakeInfo.stakable_tokens) / AIRDROP_TOKEN_DIVISOR} ${stakeInfo.token_name}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5">Tokens to be claimed into Wallet</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">{`${Number(stakeInfo.claimable_tokens_to_wallet) / AIRDROP_TOKEN_DIVISOR} ${
                stakeInfo.token_name
              }`}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6}>
              <Button onClick={toggleStakeModal} color="secondary" variant="contained" fullWidth>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={handleStakeClick} color="secondary" variant="contained" fullWidth>
                Stake
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ marginBottom: 2, marginTop: 2 }}>
            <Grid item xs={13} justifyContent="center" alignItems="right">
              <Typography id="stake-modal-description" variant="p">
                <Link
                  href="https://app.singularitydao.ai/staking/bonded"
                  target="_blank"
                  rel="noreferrer"
                  sx={{ mx: 1, fontSize: 14 }}
                >
                  Visit SingularityDAO
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <LoaderModal loading={registrationLoader} />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={10} md={12}>
          <Box>
            <GradientBox
              $background="bgGradientHighlight"
              className={styles.contentWrapper}
              sx={{
                px: 4,
                pt: 5,
                pb: 5,
                borderRadius: 2,
              }}
            >
              {!cardanoWalletAddress ? (
                <>
                  <Container sx={{ my: 6 }}>
                    <Typography color="text.secondary" variant="h4" align="center" mb={1}>
                      {windowName} &nbsp;
                      {windowOrder} / {totalWindows} &nbsp;
                      {windowAction}:
                    </Typography>
                    <Typography color="text.secondary" variant="h4" align="center" mb={6}>
                      {formattedDate}
                    </Typography>
                  </Container>

                  <FlipCountdown endDate={endDate} />
                </>
              ) : null}
              {airdropStatusMessage === AirdropStatusMessage.CLAIM && isClaimActive ? (
                <>
                  <Box>
                    <Typography align="center" color="text.secondary" fontWeight={600} fontSize={20}>
                      {`${windowName} ${windowOrder - 1} / ${totalWindows} is Open:`}
                    </Typography>
                    <Typography align="center" color="text.secondary" fontSize={14} mt={3}>
                      {`${windowName} ${windowOrder - 1} of ${totalWindows}  Rewards`}
                    </Typography>
                    <Typography color="textAdvanced.secondary" align="center" fontWeight={600} fontSize={24} mt={1}>
                      {airdropWindowrewards / AIRDROP_TOKEN_DIVISOR} {stakeInfo.token_name}
                    </Typography>
                  </Box>
                  <Container
                    sx={{
                      my: 4,
                      display: 'flex',
                      border: 0.3,
                      bgcolor: 'note.main',
                      borderRadius: 1,
                      borderColor: 'note.main',
                      width: '50%',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        my: 1,
                        py: 1,
                        m: 1,
                      }}
                    >
                      <InfoIcon color="primary" />
                      <Typography
                        variant="body2"
                        color="textAdvanced.primary"
                        sx={{ mx: 1, fontSize: 14, lineHeight: '21px' }}
                      >
                        You can start claiming your tokens now. It is possible to claim all tokens with the last airdrop
                        window which allow you save on the gas cost fees. However we recommend you claim your tokens at
                        each window claim time.
                      </Typography>
                    </Box>
                  </Container>
                </>
              ) : null}
              {uiAlert.message ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 3 }}>
                  <SnetAlert type={uiAlert.type} error={uiAlert.message} />
                </Box>
              ) : null}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: ['column', 'row'],
                  gap: [0, 2],
                }}
              >
                {cardanoWalletAddress ? (
                  airdropStatusMessage === AirdropStatusMessage.CLAIM && isClaimActive ? (
                    <Stack spacing={1} direction="row">
                      <LoadingButton
                        variant="contained"
                        color="secondary"
                        sx={{
                          width: 366,
                          textTransform: 'capitalize',
                          fontWeight: 600,
                          height: 40,
                          fontSize: 14,
                        }}
                        onClick={handleClaimClick}
                        loading={claimLoader}
                      >
                        Claim Now
                      </LoadingButton>
                    </Stack>
                  ) : null
                ) : (
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: 'capitalize', width: 366, fontWeight: 600 }}
                    onClick={handleMapCardanoWallet}
                    loading={registrationLoader}
                    disabled={userEligibility === UserEligibility.NOT_ELIGIBLE}
                  >
                    MAP CARDANO WALLET
                  </LoadingButton>
                )}
              </Box>
              <Stack spacing={3} direction="row" justifyContent="center" mt={3}>
                <Button
                  variant="outlined"
                  color="bgHighlight"
                  onClick={onViewSchedule}
                  sx={{ textTransform: 'capitalize', width: 172, height: 41 }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Schedule
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  color="bgHighlight"
                  onClick={onViewRules}
                  sx={{ textTransform: 'capitalize', width: 172, height: 41 }}
                >
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Rules
                  </Typography>
                </Button>
              </Stack>
              {history && history.length > 0 ? (
                <Container maxWidth="md">
                  <Typography align="center" color="textAdvanced.secondary" variant="h5">
                    Your Claim History
                  </Typography>
                  <History events={history} />
                </Container>
              ) : null}
            </GradientBox>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
