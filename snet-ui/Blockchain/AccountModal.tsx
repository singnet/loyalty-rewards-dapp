import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import useStyles from './styles';
import { DialogActions } from '@material-ui/core';

type AccountModalProps = {
  account: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  changeAccount: () => void;
};

let copiedStateTimeout;

export default function AccountModal({ account, open, setOpen, changeAccount }: AccountModalProps) {
  const [copied, setCopied] = useState(false);
  const [showChangebutton, setShowchangeButton] = useState(false);
  const { connector } = useWeb3React();

  const theme = useTheme();
  const matchesSmallDevices = useMediaQuery(theme.breakpoints.up('sm'));

  const classes = useStyles();

  useEffect(() => {
    if (connector instanceof WalletConnectConnector) {
      setShowchangeButton(true);
    }
  }, [connector]);

  const handleClose = () => setOpen(false);

  const handleCopyAddressToClipboard = () => {
    if (window && window.navigator) {
      window.navigator.clipboard.writeText(account);
      setCopied(true);
      if (copiedStateTimeout) {
        clearTimeout(copiedStateTimeout);
      }
      copiedStateTimeout = setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  const handleViewOnExplorer = () => {
    let url;
    if (process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID === '3') {
      url = `https://ropsten.etherscan.io/address/${account}`;
    } else if (process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_ID === '1') {
      url = `https://etherscan.io/address/${account}`;
    }
    window.open(url, '_blank');
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

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} className={classes.accountModalDialog}>
        <DialogTitle>
          <Typography variant="h5">Wallets Account</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box className={classes.ethAccountDetails}>
            <Box>
              <img src={} alt="Wallet Connect" />
              <Typography>Wallet Connect</Typography>
            </Box>
            <Box>
              <Box>
                <Typography>Type</Typography>
              </Box>
              <Box>
                <Typography>Network</Typography>
                <Typography>Ropsten Test Network</Typography>
              </Box>
              <Typography>{account}</Typography>
              <Box className={ethAccBtnContainer}>
                <span>copy</span>
                <span>delete</span>
              </Box>
            </Box>
          </Box>
          <Box dividers className={cardanoAccDetails}>
            <Box>
              <img src={} alt="Wallet Connect" />
              <Typography>Wallet Connect</Typography>
            </Box>
            <Box>
              <Typography>Please select a Cardano wallet you want to map</Typography>
              <Box></Box>
              <Typography>Please note once wallet is maped you cannot change it.</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Typography>
            By connecting to the wallets, you agree to our <Typography>Terms & Conditions</Typography>{' '}
          </Typography>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
