import React from 'react';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { List, ListItem, ListItemText, Tooltip } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CopyIcon from '@mui/icons-material/ContentCopy';
import LogoutIcon from '@mui/icons-material/Logout';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import useStyles from './styles';
import { DialogActions } from '@material-ui/core';
import { supportedCardanoWallets } from '../utils/walletDetails';

type AccountModalProps = {
  account: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  changeAccount: () => void;
};

export default function AccountModal({ account, open, setOpen, changeAccount }: AccountModalProps) {
  const { connector } = useWeb3React();
  const classes = useStyles();

  const handleClose = () => setOpen(false);

  const onCopyAddress = () => {
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(account);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector?.close();
      }
      changeAccount();
    } catch (e) {
      console.log('Error on deactivatin', e);
    }
  };

  // const openWallet = async (blockchain, wallet) => {
  //   try {
  //     const blockchainName = upperCase(blockchain);
  //     if (blockchainName === availableBlockchains.ETHEREUM) {
  //       connectEthereumWallet();
  //     }

  //     if (blockchainName === availableBlockchains.CARDANO) {
  //       await connectCardanoWallet(wallet);
  //     }
  //   } catch (error) {
  //     console.log('Error while connecting wallet', error);
  //     throw error;
  //   }
  // };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} className={classes.accountModalDialog}>
        <DialogTitle>
          <Typography variant="h5">Wallets Account</Typography>
          <IconButton onClick={handleClose}>
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
              <Box className={classes.ethWalletDetails}>
                <Box>
                  <span variant="body1">Type</span>
                  <span>Etherum</span>
                </Box>
                <Box>
                  <span>Network</span>
                  <span>Ropsten Test Network</span>
                </Box>
                <Typography className={classes.accountNo}>
                  <AccountBalanceWalletIcon />
                  {account}
                </Typography>
                <Box className={classes.ethAccBtnContainer}>
                  <Button variant="text" onClick={onCopyAddress} startIcon={<CopyIcon />}>
                    copy
                  </Button>
                  <Button onClick={disconnectWallet} variant="text" startIcon={<LogoutIcon />}>
                    Disconnect
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={5} className={classes.walletAccDetails}>
              <img src="https://ropsten-bridge.singularitynet.io/cardano_logo.png" alt="Cardano" />
              <Typography variant="h4">Cardano</Typography>
            </Grid>
            <Grid item md={7} className={classes.cardanoAccDetails}>
              <Typography>Please select a Cardano wallet you want to map</Typography>
              <List className={classes.cardanoWalletList}>
                {supportedCardanoWallets.map((wallet) => (
                  <ListItem key={wallet.identifier}>
                    <img alt={wallet.wallet} src={wallet.logo} />
                    <span>{wallet.wallet}</span>
                  </ListItem>
                ))}
              </List>
              <Typography>Please note once wallet is maped you cannot change it.</Typography>
            </Grid>
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
