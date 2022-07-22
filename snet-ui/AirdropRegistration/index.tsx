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
  LOADER_MESSAGE,
} from '../../utils/airdropWindows';
import Alert, { AlertColor } from '@mui/material/Alert';
import LoadingButton from '../../snet-ui/LoadingButton';
import Link from '@mui/material/Link';
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
import airdropRegistrationStyles from './styles';
import LoaderModal from 'components/Registration/loaderModal';
import { setStartMapingCardano } from 'utils/store/features/walletSlice';
import AccountModal from 'snet-ui/Blockchain/AccountModal';

type HistoryEvent = {
  window: string;
  reward: string;
  status: string;
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
  isClaimInitiated: boolean;
  claimedWindow: number;
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
  isClaimInitiated,
  claimedWindow,
}: AirdropRegistrationProps) {
  const [stakeModal, setStakeModal] = useState(false);
  const [showWalletConnectModal, setShowConnectionModal] = useState(false);
  const [loader, setLoader] = useState({
    loading: false,
    message: null,
  });

  const formattedDate = useMemo(() => getDateInStandardFormat(endDate), [endDate]);
  const { connectWallet, getChangeAddress } = useInjectableWalletHook(cardanoSupportingWallets);
  const { cardanoWalletAddress, startMappingCardano, cardanoMapedDate } = useAppSelector((state) => state.wallet);

  const dispatch = useAppDispatch();
  const classes = airdropRegistrationStyles();

  useEffect(() => {
    if (startMappingCardano) {
      handleMapCardanoWallet();
      dispatch(setStartMapingCardano(false));
    }
  }, [startMappingCardano]);

  const toggleWalletConnectModal = () => {
    setShowConnectionModal(!showWalletConnectModal);
  };

  const toggleStakeModal = () => {
    setStakeModal(!stakeModal);
  };

  const stopLoader = () => {
    setLoader({ loading: false, message: null });
  };

  const startLoader = (message) => {
    setLoader({ loading: true, message });
  };
  const handleClaimClick = async () => {
    try {
      startLoader(LOADER_MESSAGE.CLAIM_PROGRESS);
      await onClaim();
    } finally {
      stopLoader();
    }
  };

  const handleStakeClick = async () => {
    try {
      toggleStakeModal();
      await onAutoStake();
    } finally {
    }
  };

  const handleMapCardanoWallet = async () => {
    startLoader(LOADER_MESSAGE.MAP_CARDANO_WALLET_PROGRESS);
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
      stopLoader();
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
      <LoaderModal loader={loader} />
      <AccountModal open={showWalletConnectModal} onClose={toggleWalletConnectModal} />
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={10} md={12}>
          <Box>
            <GradientBox
              $background="bgGradientHighlight"
              sx={{
                px: 4,
                pt: 5,
                pb: 5,
                borderRadius: 2,
              }}
            >
              {!cardanoWalletAddress || isClaimInitiated ? (
                <>
                  <Box className={classes.airdropClaimStartDateTime}>
                    <Typography color="text.secondary" variant="h4" align="center" mb={1}>
                      {windowName} &nbsp;
                      {windowOrder} / {totalWindows} &nbsp;
                      {windowAction}:
                    </Typography>
                    <Typography color="text.secondary" variant="h4" align="center" mb={6}>
                      {formattedDate}
                    </Typography>
                  </Box>

                  <FlipCountdown endDate={endDate} />
                </>
              ) : null}
              {cardanoWalletAddress && isClaimActive && !isClaimInitiated ? (
                <>
                  <Box>
                    <Typography
                      align="center"
                      color="text.secondary"
                      fontWeight={600}
                      fontSize={20}
                      fontFamily="MuliSemiBold"
                    >
                      {`${windowName} ${windowOrder} / ${totalWindows} is Open:`}
                    </Typography>
                    <Typography
                      align="center"
                      color="text.secondary"
                      fontSize={14}
                      mt={3}
                      fontFamily="MontserratRegular"
                    >
                      {`${windowName} ${windowOrder} of ${totalWindows}  Rewards`}
                    </Typography>
                    <Typography
                      color="textAdvanced.secondary"
                      fontFamily="MuliSemiBold"
                      align="center"
                      fontWeight={600}
                      fontSize={24}
                      mt={1}
                    >
                      {airdropWindowrewards / AIRDROP_TOKEN_DIVISOR} {stakeInfo.token_name}
                    </Typography>
                  </Box>
                  <Container
                    sx={{
                      marginTop: 4,
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
                        fontFamily="MuliRegular"
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
                  mt: 3,
                }}
              >
                {cardanoWalletAddress && isClaimActive ? (
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
                    disabled={isClaimInitiated}
                  >
                    CLAIM NOW
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    sx={{ textTransform: 'capitalize', width: 366, fontWeight: 600 }}
                    onClick={toggleWalletConnectModal}
                    disabled={userEligibility === UserEligibility.NOT_ELIGIBLE}
                  >
                    MAP CARDANO WALLET
                  </LoadingButton>
                )}
              </Box>
              <Box className={classes.viewBtnsContainer}>
                <Button variant="outlined" onClick={onViewSchedule}>
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Schedule
                  </Typography>
                </Button>
                <Button variant="outlined" onClick={onViewRules}>
                  <Typography color="text.secondary" fontSize="14px" fontWeight="600">
                    View Rules
                  </Typography>
                </Button>
              </Box>
              {cardanoWalletAddress ? (
                <Box display="flex" justifyContent="center">
                  <Box
                    className={classes.claimedContainer}
                    px={3}
                    py={2}
                    m={5}
                    border={1}
                    borderLeft={0}
                    borderRight={0}
                  >
                    <Typography color="text.secondary" fontSize="14px">
                      Airdrop Windows Claimed
                    </Typography>
                    <Typography color="text.secondary" fontSize="24px" fontWeight="600">
                      {`${claimedWindow} / ${totalWindows}`}
                    </Typography>
                  </Box>
                </Box>
              ) : null}
              {history && history.length > 0 ? (
                <Container maxWidth="md" sx={{ mt: 3 }}>
                  <Typography align="center" color="textAdvanced.secondary" fontSize={18} fontWeight={600}>
                    Your Airdrop History
                  </Typography>
                  <Box display={'flex'} justifyContent={'center'} mt={2}>
                    <Grid
                      xs={9}
                      justifyContent="space-between"
                      sx={{
                        bgcolor: 'bgHighlight.main',
                        borderRadius: '2px',
                        px: 3,
                        py: 2,
                        height: 52,
                        display: 'flex',
                      }}
                    >
                      <Typography color="textAdvanced.dark" fontSize={14} fontWeight={600}>
                        Cardano Wallet Mapped
                      </Typography>
                      <Typography color="textAdvanced.dark" fontSize={14}>
                        {cardanoMapedDate}
                      </Typography>
                    </Grid>
                  </Box>
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
