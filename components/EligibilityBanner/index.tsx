import { Grid, Typography, Box, Avatar, Tooltip, IconButton } from '@mui/material';
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
          <Avatar alt="Metamask" src="https://ropsten-bridge.singularitynet.io/metamask_logo.png" />
          <div>
            <span>Connected Wallet Address</span>
            <Typography noWrap variant="priority" component="p">
              {addEllipsisInBetweenString(account)}
              <ContentCopyIcon onClick={(e) => onClickCopy(account)} />
              {/* <Tooltip title="Copied">
                <IconButton>
                  <ContentCopyIcon onClick={(e) => onClickCopy(account)} />
                </IconButton>
              </Tooltip> */}
            </Typography>
            <Typography variant="h5">
              Ethereum {network?.toLowerCase()}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.walletDetailsContainer}>
          <Avatar alt="Cardano" src="https://ropsten-bridge.singularitynet.io/cardano_logo.png" />
          <div>
            <span>Mapped Cardano Wallet Address</span>
            {cardanoWalletAddress ? (
              <>
                <Typography noWrap variant="priority" component="p">
                  {addEllipsisInBetweenString(cardanoWalletAddress)}
                  <ContentCopyIcon onClick={(e) => onClickCopy(account)} />
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
