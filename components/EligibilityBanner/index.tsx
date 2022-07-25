import { Grid, Typography, Box, Avatar, Button } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { SupportedChainId } from 'snet-ui/Blockchain/connectors';
import { useActiveWeb3React } from 'snet-ui/Blockchain/web3Hooks';
import { UserEligibility } from 'utils/constants/CustomTypes';
import Notqualified from 'snet-ui/Noteligible';
import SkeletonLoader from './SkeletonLoader';
import { useAppSelector } from 'utils/store/hooks';
import { selectActiveWindow } from 'utils/store/features/activeWindowSlice';
import { AIRDROP_ELIGIBILITY_STRING, windowNameActionMap } from 'utils/airdropWindows';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { supportedEtherumWallet, cardanoWalletDetails } from './constants';
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
  const [ethCopyBtnName, setEthCopyBtnName] = useState('Copy');
  const [cardanoCopyBtnName, setCardanoCopyBtnName] = useState('Copy');
  const network = useMemo(() => SupportedChainId[chainId ?? ''], [chainId]);
  const classes = useStyles();

  if (!account) return null;

  if (userEligibility === UserEligibility.PENDING) {
    return <SkeletonLoader />;
  }

  if (!activeWindow) {
    return null;
  }

  const addEllipsisInBetweenString = (str) => `${str.substr(0, 15)}...${str.substr(str.length - 15)}`;

  const onClickCopy = (address) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <Box className={classes.eligibilityBannerContainer}>
      <Grid item xs={12} md={12} className={classes.airDropStatusContainer}>
        <Typography variant="normal">{AIRDROP_ELIGIBILITY_STRING}</Typography>
        <Typography variant="h5" data-airdrop-status-type={airdropStatusMessage}>
          {airdropStatusMessage}
        </Typography>
      </Grid>
      <Grid container spacing={2} mt={2} className={classes.walletDetailsMainGrid}>
        <Grid item xs={12} md={6} className={classes.walletDetailsContainer}>
          <Avatar alt={supportedEtherumWallet.name} src={supportedEtherumWallet.logoUrl} />
          <div>
            <span>Connected Wallet Address</span>
            <Button onClick={(e) => onClickCopy(account)}>
              <Typography noWrap variant="priority" component="p">
                {addEllipsisInBetweenString(account)}
                <ContentCopyIcon />
              </Typography>
            </Button>
            <Typography variant="h5">Ethereum {network?.toLowerCase()}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.walletDetailsContainer}>
          <Avatar alt={cardanoWalletDetails.name} src={cardanoWalletDetails.logoUrl} />
          <div>
            <span>Mapped Cardano Wallet Address</span>
            {cardanoWalletAddress ? (
              <>
                <Button onClick={(e) => onClickCopy(cardanoWalletAddress)}>
                  <Typography noWrap variant="priority" component="p">
                    {addEllipsisInBetweenString(cardanoWalletAddress)}
                    <ContentCopyIcon />
                  </Typography>
                </Button>
                <Typography variant="h5">Cardano {network?.toLowerCase()}</Typography>
              </>
            ) : (
              <Typography variant="h6">Not Connected</Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
