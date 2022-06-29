import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { SupportedChainId } from 'snet-ui/Blockchain/connectors';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { UserEligibility } from 'utils/constants/CustomTypes';
import Notqualified from 'snet-ui/Noteligible';
import SkeletonLoader from './SkeletonLoader';
import { useAppSelector } from 'utils/store/hooks';
import { selectActiveWindow } from 'utils/store/features/activeWindowSlice';
import { AIRDROP_ELIGIBILITY_STRING, windowNameActionMap } from 'utils/airdropWindows';

type EligibilityBannerProps = {
  onViewRules: () => void;
  onViewSchedule: () => void;
  userEligibility: UserEligibility;
  rejectReasons?: string;
};

export default function EligibilityBanner({
  userEligibility,
  onViewRules,
  onViewSchedule,
  rejectReasons,
}: EligibilityBannerProps) {
  const { account, chainId, library } = useActiveWeb3React();
  const { window: activeWindow, totalWindows } = useAppSelector(selectActiveWindow);
  const { cardanoWalletAddress } = useAppSelector((state) => state.wallet);
  const { airdropStatusMessage } = useAppSelector((state) => state.airdropStatus);
  const network = useMemo(() => SupportedChainId[chainId ?? ''], [chainId]);

  if (!account) return null;

  if (!activeWindow) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: 'bgHighlight.main',
        my: 1,
        p: 4,
        py: 2,
        borderRadius: 2,
      }}
      color="textAdvanced.dark"
    >
      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="normal">{AIRDROP_ELIGIBILITY_STRING}</Typography>
          <Typography variant="h5" color="primary.main" ml={1}>
            {airdropStatusMessage}
          </Typography>
        </Box>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Typography>Connected Wallet Address</Typography>
          <Typography noWrap variant="priority" component="p">
            {account}
          </Typography>
          <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
            Ethereum {network?.toLowerCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Mapped Cardano Wallet Address</Typography>
          {cardanoWalletAddress ? (
            <>
              <Typography noWrap variant="priority" component="p">
                {cardanoWalletAddress}
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
                Cardano {network?.toLowerCase()}
              </Typography>
            </>
          ) : (
            <Typography sx={{ textTransform: 'capitalize' }} variant="h5">
              Not Connected
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
