import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { List, ListItem } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import useStyles from './styles';
import { DialogActions } from '@material-ui/core';
import { supportedCardanoWallets } from '../utils/walletDetails';
import { useAppDispatch, useAppSelector } from 'utils/store/hooks';
import { SupportedChainId } from '../Blockchain/connectors';
import { useActiveWeb3React } from '../Blockchain/web3Hooks';
import { setCardanowalletName, setStartMapingCardano } from 'utils/store/features/walletSlice';

type AccountModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AccountModal({ open, onClose }: AccountModalProps) {
  const { account, chainId, deactivate } = useActiveWeb3React();
  const { cardanoWalletAddress, cardanoWalletName } = useAppSelector((state) => state.wallet);
  const [copyEth, setCopyETh] = useState('copy');
  const [copyCardano, setCopyCardano] = useState('copy');
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const onCopyAddress = (isCardano = false) => {
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(isCardano ? cardanoWalletAddress : account);
    }
    const setCopied = isCardano ? setCopyCardano : setCopyETh;
    setCopied('copied');
    setTimeout(() => {
      setCopied('copy');
    }, 3000);
  };

  const disconnectWallet = async () => {
    try {
      deactivate();
      onClose();
      localStorage.setItem('DISCONNECTED', 'true');
    } catch (e) {
      console.log('Error on deactivatin', e);
    }
  };

  const connectCardanoWallet = (wallet) => {
    onClose();
    dispatch(setStartMapingCardano(true));
    dispatch(setCardanowalletName(wallet.wallet));
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose} className={classes.accountModalDialog}>
        <DialogTitle>
          <Typography variant="h5">Wallets Account</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent divider className={classes.accountModalDialogContent}>
          <Grid container className={classes.ethAccountDetails}>
            <Grid item md={5}>
              <Box className={classes.walletAccDetails}>
                <img src="/images/walletAccount_connectWallet.svg" alt="Wallet Connect" />
                <Typography variant="h4">Wallet Connect</Typography>
              </Box>
            </Grid>
            <Grid item md={7}>
              <Box className={classes.connectedWalletDetails}>
                <Box>
                  <span variant="body1">Type</span>
                  <span>Etherum</span>
                </Box>
                <Box>
                  <span>Network:</span>
                  <span>{chainId === 1 ? 'Mainnet Network' : 'Ropsten Test Network'}</span>
                </Box>
                <Typography className={classes.accountNo}>
                  <AccountBalanceWalletIcon />
                  {account}
                </Typography>
                <Box className={classes.ethAccBtnContainer}>
                  <Button
                    variant="text"
                    onClick={() => onCopyAddress(false)}
                    startIcon={<CopyIcon />}
                    className={classes.copyBtn}
                  >
                    {copyEth}
                  </Button>
                  <Button
                    onClick={disconnectWallet}
                    variant="text"
                    startIcon={<LogoutIcon />}
                    className={classes.disconnectBtn}
                  >
                    Disconnect
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={5} flexDirection="column">
              {cardanoWalletAddress ? <span className={classes.mappedToTxt}>Mapped to</span> : null}
              <Box className={classes.walletAccDetails}>
                <img src="https://ropsten-bridge.singularitynet.io/cardano_logo.png" alt="Cardano" />
                <Typography variant="h4">Cardano</Typography>
              </Box>
            </Grid>
            {!cardanoWalletAddress ? (
              <Grid item md={7} className={classes.cardanoAccDetails}>
                <Typography>Please select a Cardano wallet you want to map</Typography>
                <List className={classes.cardanoWalletList}>
                  {supportedCardanoWallets.map((wallet) => (
                    <ListItem key={wallet.identifier} onClick={() => connectCardanoWallet(wallet)}>
                      <img alt={wallet.wallet} src={wallet.logo} />
                      <span>{wallet.wallet}</span>
                    </ListItem>
                  ))}
                </List>
                <Typography>Please note once wallet is maped you cannot change it.</Typography>
              </Grid>
            ) : (
              <Grid md={7} className={classes.connectedWalletDetails}>
                <Box>
                  <span variant="body1">Wallet:</span>
                  <span>{cardanoWalletName}</span>
                </Box>
                <Typography className={classes.accountNo}>
                  <AccountBalanceWalletIcon />
                  {cardanoWalletAddress}
                </Typography>
                <Button
                  variant="text"
                  onClick={() => onCopyAddress(true)}
                  startIcon={<CopyIcon />}
                  className={classes.copyBtn}
                >
                  {copyCardano}
                </Button>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className={classes.accountModalDialogActions}>
          <Typography>
            By connecting to the wallets, you agree to our{' '}
            <a href="https://public.singularitynet.io/terms_and_conditions.html" title="Terms & Conditions">
              Terms & Conditions
            </a>
          </Typography>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
