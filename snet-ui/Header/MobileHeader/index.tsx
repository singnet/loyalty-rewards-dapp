import React, { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';

import NavBar from '../NavBar';
import mobileHeaderStyles from './styles';

type MobileHeaderProps = {
  navigationData: any;
};
const MobileHeader = ({ navigationData }: MobileHeaderProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const classes = mobileHeaderStyles();

  const openMobileNavigation = () => {
    setShowMobileMenu(true);
  };

  const closeMobileNavigation = () => {
    setShowMobileMenu(false);
  };

  if (!showMobileMenu) {
    return (
      <div className={classes.hamburger} onClick={openMobileNavigation}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className={classes.mobileNavContainer}>
      <div className={classes.closeMenuIcon}>
        <CancelIcon onClick={closeMobileNavigation} />
      </div>
      <nav className={classes.mobileNavigation}>
        <NavBar navigationData={navigationData} type="mobile" />
      </nav>
    </div>
  );
};

export default MobileHeader;
