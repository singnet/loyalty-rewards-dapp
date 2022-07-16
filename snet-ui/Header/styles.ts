import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const headerStyles = makeStyles((theme: Theme) => ({
  header: {
    background: `${theme.palette.background.default} !important`,
    boxShadow: '0 2px 3px 0 rgba(0,0,0,0.1)',
    '& .MuiToolbar-root': {
      maxWidth: '1160px',
      width: '100%',
      padding: 0,
      margin: '0 auto',
      '@media(max-width: 640px)': {
        padding: '15px 0',
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    '@media(max-width: 1200px)': { padding: '0 20px' },
  },
  rightMobileMenu: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    '@media(max-width: 640px)': { margin: '15px 0 0 0' },
  },
  drawerIcon: {
    marginLeft: 'auto !important',
    padding: '0px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    '& a': { lineHeight: 0 },
    '& span': {
      marginLeft: 8,
      color: `${theme.palette.common.black1}`,
      fontSize: 22,
      fontFamily: 'MuliRegular',
      fontWeight: 300,
      letterSpacing: -0.5,
      lineHeight: '30px',
      '@media(max-width:640px)': { fontSize: 18 },
    },
    '@media(max-width:1023px)': { marginLeft: 40 },
  },
  navlinks: {
    marginLeft: 'auto',
  },
  rightButton: {
    marginLeft: '50px',
    '& svg': {
      boxSizing: 'content-box',
      padding: 7,
      border: '1px solid #CCCCCC',
      borderRadius: '50%',
      backgroundColor: '#9B9B9B',
      color: `${theme.palette.common.white}`,
      fontSize: '20px',
    },
    '& div': {
      marginLeft: 11,
      textAlign: 'left',
      '& > span': {
        color: 'rgba(33,33,33,0.87)',
        fontFamily: 'MuliSemiBold',
        fontSize: 16,
        lineHeight: '20px',
        textTransform: 'capitalize',
      },
      '& p': {
        margin: 0,
        color: `${theme.palette.alertMsg.pendingBorder}`,
        fontFamily: 'MuliSemiBold',
        fontSize: 11,
        lineHeight: '14px',
        '& span': { textTransform: 'uppercase' },
      },
    },
  },
  accountButton: {
    padding: '0px',
    '& svg': {
      '@media(max-width:768px)': {
        width: '24px',
        height: '24px',
      },
    },
    '& .MuiTypography-root': {
      fontSize: '14px',
    },
  },
  signUpLink: {
    padding: '6px 18px',
    borderRadius: 4,
    marginLeft: 32,
    backgroundColor: '#4086ff',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: 1.25,
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: '#005ACB',
      transition: 'all .5s linear',
    },
    '& span': {
      '@media(max-width:768px)': { display: 'none' },
    },
  },
  link: {
    color: '#FFFFFF',
    fontFamily: 'Muli',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '19px',
  },
  wrapper: {
    boxSizing: 'border-box',
    maxWidth: 1550,
    // padding: "15px 60px",
    padding: 7,
    margin: '0 auto',
    '& > div': {
      alignItems: 'center',
      '@media(max-width: 1023px)': { justifyContent: 'space-between' },
    },
    '@media(max-width: 1023px)': { padding: '15px 12px' },
  },
  addBgColor: {
    background: 'linear-gradient(180deg, #061753 0%, #184FA7 100%)',
    backgroundColor: '#4086FF',
    boxShadow: '0 2px 6px 0 rgba(0,0,0,0.3)',
  },
  customDrawer: {
    '& .MuiDrawer-paper': {
      background: 'linear-gradient(180deg, #061753 0%, #184FA7 100%)',
      '& ul': {
        '& li': {
          '& a': {
            color: '#fff',
          },
        },
      },
    },
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    '& h1': {
      margin: 0,
      lineHeight: 0,
      '& a': { textDecoration: 'none' },
      '& span': {
        '&:before': { fontSize: 45 },
      },
    },
  },
  logoAnchor: {
    display: 'inline-block',
    '& img': {
      width: 180,
      '@media(max-width:400px)': { width: 140 },
    },
  },
  navigationSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& nav': {
      '& > ul': {
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        '& > li': {
          paddingLeft: 40,
          listStyle: 'none',
          '& a': {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            color: `${theme.palette.common.grey1}`,
            fontFamily: 'MuliSemiBold',
            fontSize: 16,
            lineHeight: '20px',
            textDecoration: 'none',
            '&:hover': { color: `${theme.palette.alertMsg.pendingBorder}` },
          },
          '&:first-of-type': { paddingLeft: 0 },
        },
      },
    },
    '@media(max-width:1023px)': { display: 'none' },
  },
  active: { color: 'red' },
  megaMenuContainer: {
    width: 628,
    borderRadius: 4,
    display: 'none',
    position: 'absolute',
    top: 60,
    left: '50%',
    backgroundColor: '#fff',
    boxShadow:
      '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    transform: 'translateX(-50%)',
    cursor: 'default',
    '& > div': { borderTop: '1px solid #D6D6D6' },
    '& h5': {
      padding: '16px 24px',
      margin: 0,
      color: 'black',
      fontSize: 14,

      fontWeight: 600,
      lineHeight: '18px',
      textTransform: 'uppercase',
    },
    '& a': {
      width: 309,
      padding: '11px 14px 12px 16px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#fafafa',
        '& h6': { color: 'black' },
        '& span': {
          color: 'black',
          fontWeight: 'bold',
        },
      },
    },
  },
  megaMenues: {
    '& ul': {
      padding: 0,
      display: 'flex',
      flexWrap: 'wrap',
      '& li': {
        paddingLeft: 0,
        listStyle: 'none',
        '& a': { textDecoration: 'none' },
      },
    },
  },
  megaMenuContent: {
    marginLeft: 9,
    '& h6': {
      margin: 0,
      color: 'black',
      fontSize: 16,

      fontWeight: 500,
      letterSpacing: 0.5,
      lineHeight: '20px',
    },
    '& span': {
      color: 'black',
      fontSize: 12,

      letterSpacing: 0.38,
      lineHeight: '16px',
    },
  },
}));

export default headerStyles;
