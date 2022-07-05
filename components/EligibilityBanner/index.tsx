import { Grid, Typography, Box, Avatar } from '@mui/material';
import React, { useMemo } from 'react';
import { SupportedChainId } from 'snet-ui/Blockchain/connectors';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import { UserEligibility } from 'utils/constants/CustomTypes';
import Notqualified from 'snet-ui/Noteligible';
import SkeletonLoader from './SkeletonLoader';
import { useAppSelector } from 'utils/store/hooks';
import { selectActiveWindow } from 'utils/store/features/activeWindowSlice';
import { AIRDROP_ELIGIBILITY_STRING, windowNameActionMap } from 'utils/airdropWindows';
import styles from './styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(styles);

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
  const classes = useStyles();

  if (!account) return null;

  if (!activeWindow) {
    return null;
  }

  return (
    <Box className={classes.eligibilityBannerContainer}>
      <Grid item xs={12} md={12} className={classes.airDropStatusContainer}>
        <Typography variant="normal">{AIRDROP_ELIGIBILITY_STRING}</Typography>
        <Typography variant="h5" data-airdrop-status-type={airdropStatusMessage}>
          {airdropStatusMessage}
        </Typography>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6} className={classes.walletDetailsContainer}>
          <Avatar alt="Metamask" />
          <div>
            <span>Connected Wallet Address</span>
            <Typography noWrap variant="priority" component="p">
              {account}
            </Typography>
            <Typography variant="h5">
              Ethereum {network?.toLowerCase()}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.walletDetailsContainer}>
          <Avatar alt="Metamask" />
          <div>
            <span>Mapped Cardano Wallet Address</span>
            {cardanoWalletAddress ? (
              <>
                <Typography noWrap variant="priority" component="p">
                  {cardanoWalletAddress}
                </Typography>
                <Typography variant="h5">
                  Cardano {network?.toLowerCase()}
                </Typography>
              </>
            ) : (
              <Typography variant="h6">
                Not Connected
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
