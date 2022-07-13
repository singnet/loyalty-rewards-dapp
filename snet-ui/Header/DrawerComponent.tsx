import React, { useMemo, useState } from 'react';
import { navData, userActions } from '../../snet-ui/constants/Header';
import {
  Drawer,
  IconButton,
} from '@material-ui/core';
import headerStyles from './styles';
// import { WithStyles, withStyles } from '@mui/styles';
import {
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import AccountModal from 'snet-ui/Blockchain/AccountModal';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuIcon from '@mui/icons-material/Menu';
import SNETButton from "../SNETButton";
import MobileHeader from './MobileHeader';

type DrawerComponentProps = {
    account?: string;
    navigationData: any;
    userActions: any;
    onConnectWallet: () => void;
  };
const DrawerComponent = ({
  navigationData,
  userActions,
  account,
  onConnectWallet,
}: DrawerComponentProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = headerStyles();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const truncatedAddress = useMemo(() => {
    if (!account) return '';
    return `${account.slice(0, 4)}...${account.slice(-4)}`;
  }, [account]);

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MobileHeader showMobileMenu={false} navigationData={navigationData} userActions={userActions} />
      <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        className={classes.customDrawer}
      >
        <Box role="presentation" sx={{ width: 300 }}>
          <List>
            {
            navData.map((navItem) => (
              <ListItem onClick={() => setOpenDrawer(false)} key={navItem.id}>
                <ListItemButton component="a" href={navItem.url} title={navItem.name} target="_blank" rel="noreferrer">
                  <ListItemText primary={navItem.name} />
                </ListItemButton>
              </ListItem>
            ))
          }
          </List>
        </Box>
      </Drawer>
      <div className={classes.rightMobileMenu}>
        {account ? (
          <>
            <div className={classes.rightButton}>
              <Button
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenUserMenu}
                className={classes.accountButton}
              >
                <AccountBalanceWalletIcon />
                <Typography component="span">{truncatedAddress}</Typography>
              </Button>
              <AccountModal
                account={account}
                open={open}
                setOpen={handleUserMenuClose}
                changeAccount={onConnectWallet}
              />
            </div>
            {/* <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={() => setOpenDrawer(!openDrawer)}>
              <MenuIcon />
            </IconButton> */}
          </>
        ) : (
          <SNETButton variant="contained" name="connect wallet" onClick={onConnectWallet} />
        )}

      </div>
      </>
    </>
  );
};
export default DrawerComponent;
