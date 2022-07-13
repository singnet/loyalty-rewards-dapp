import React, { useMemo } from 'react';
import NavBar from './NavBar';
import headerStyles from './styles';
import { navData, userActions } from '../../snet-ui/constants/Header';
import { Button as MuiButton, useMediaQuery } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import AccountModal from '../Blockchain/AccountModal';
import { AppBar, Toolbar, useTheme } from '@material-ui/core';
import DrawerComponent from './DrawerComponent';
import SNETButton from '../SNETButton';

type HeaderProps = {
  account?: string;
  onConnectWallet: () => void;
  onDisconnect: () => void;
};

const Button = styled(MuiButton)`
  text-transform: capitalize;
`;

const Header = ({ onConnectWallet, onDisconnect, account }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = headerStyles();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnectWallet = () => {
    onDisconnect();
    handleUserMenuClose();
  };

  const truncatedAddress = useMemo(() => {
    if (!account) return '';
    return account.slice(0, 4) + '...' + account.slice(-4);
  }, [account]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1023));
  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar>
        <div className={classes.logo}>
          <a href="/" className={classes.logoAnchor}>
            <img src="/AppLogo.svg" alt="SingularityNET" />
          </a>
          <span>Loyality Rewards</span>
        </div>
        {isMobile ? (
          <DrawerComponent
            onConnectWallet={onConnectWallet}
            navigationData={navData}
            userActions={userActions}
            account={account}
          />
        ) : (
          <div className={classes.navlinks}>
            <div className={classes.navigationSection}>
              <NavBar navigationData={navData} onConnectWallet={onConnectWallet} />
              {account ? (
                <div className={classes.rightButton}>
                  <Button aria-expanded={open ? 'true' : undefined} onClick={handleOpenUserMenu}>
                    <AccountBalanceWalletIcon />
                    <Typography component="span">
                      {truncatedAddress}
                    </Typography>
                  </Button>
                  {/* <Menu anchorEl={anchorEl} open={open}>
                        <MenuItem onClick={handleDisconnectWallet}>Signout</MenuItem>
                      </Menu> */}
                  <AccountModal
                    account={account}
                    open={open}
                    setOpen={handleUserMenuClose}
                    changeAccount={onConnectWallet}
                  />
                </div>
              ) : (
                <div className={classes.rightButton}>
                  <SNETButton variant="contained" name="connect wallet" onClick={onConnectWallet} />
                </div>
              )}
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
