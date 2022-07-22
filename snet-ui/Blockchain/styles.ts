import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  connectWalletDialog: {
    '& .MuiPaper-elevation': {
      maxWidth: 800,
      width: '100%',
      margin: 0,
      boxShadow: 'none',
      '& h5': {
        fontFamily: 'MuliSemiBold',
        '& + button': {
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'rgba(0, 0, 0, .87)',
        },
      },
      '@media(max-width: 800px)': { maxWidth: '90%' },
    },
  },
  connectWalletDialogContent: {
    padding: 0,
  },
  connectWalletFooter: {
    padding: '28px 15px',
    marginTop: 21,
    backgroundColor: `${theme.palette.textAdvanced.grey2}`,
    '& p': {
      margin: 0,
      color: `${theme.palette.common.grey1}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 13,
      letterSpacing: -0.14,
      lineHeight: '16px',
      textAlign: 'center',
      '& a': { color: `${theme.palette.alertMsg.pendingBorder}` },
    },
  },
  connectWalletDialogConnectBody: {
    '& > div': {
      width: '100%',
      padding: '24px 18px',
      margin: 0,
      '& > div': {
        maxWidth: 370,
        padding: '0 !important',
        '& button': {
          width: '100%',
          padding: '60px 24px',
          borderRadius: 6,
          backgroundColor: `${theme.palette.common.white}`,
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          '& div': { padding: 0 },
          '& > h5': {
            padding: '15px 0 8px',
            color: `${theme.palette.primary.main}`,
          },
          '& span': {
            color: `${theme.palette.textAdvanced.dark}`,
            fontFamily: 'MuliRegular',
            fontSize: 14,
            lineHeight: '24px',
          },
          '&:hover': {
            backgroundColor: `${theme.palette.bgFocus.main}`,
            boxShadow: 'none',
          },
          '@media(max-width: 800px)': { padding: '60px 2%' },
        },
        '&:first-of-type': {
          marginRight: 24,
          '@media(max-width: 600px)': { margin: '0 0 20px 0' },
        },
        '@media(max-width: 800px)': {
          maxWidth: '45%',
          margin: '0 auto',
        },
        '@media(max-width: 600px)': {
          maxWidth: 370,
          width: '100%',
          margin: 0,
        },
      },
      '@media(max-width: 600px)': {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    '& p': {
      color: `${theme.palette.textAdvanced.dark}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 14,
      lineHeight: '24px',
      textAlign: 'center',
      '& a': { color: `${theme.palette.alertMsg.pendingBorder}` },
    },
  },
  // Account Modal styles
  accountModalDialog: {
    '& .MuiDialog-paperScrollPaper': {
      maxWidth: 800,
      width: '100%',
      margin: 0,
      '& h2': {
        borderBottom: '1px solid #F5F7F8',
        '& h5': {
          color: `${theme.palette.primary.main}`,
          fontFamily: 'MuliSemiBold',
        },
        '& button': {
          position: 'absolute',
          right: 8,
          top: 8,
          color: `${theme.palette.textAdvanced.dark}`,
        },
      },
      '@media(max-width:800px)': { width: '90%' },
    },
  },
  accountModalDialogContent: {
    padding: '24px 16px  36px 17px !important',
    '& > div': {
      padding: '0 24px 5px 48px',
      display: 'flex',
      '& > div': {
        '&:first-of-type': {
          display: 'flex',
          flexDirection: 'column',
          '@media(max-width:800px)': { marginBottom: 25 },
        },
      },
      '@media(max-width:800px)': {
        padding: '0 24px 25px',
        flexDirection: 'column',
      },
    },
  },
  mappedToTxt: {
    marginBottom: 29,
    display: 'inline-block',
    color: `${theme.palette.textAdvanced.grey3}`,
    fontFamily: 'MuliRegular',
    fontSize: 16,
    lineHeight: '20px',
  },
  walletAccDetails: {
    paddingRight: 80,
    display: 'flex',
    alignItems: 'center',
    '& img': { width: 48 },
    '& h4': {
      paddingLeft: 16,
      color: `${theme.palette.common.black1}`,
      fontFamily: 'MuliRegular',
      fontWeight: 400,
      letterSpacing: -0.31,
    },
  },
  ethAccountDetails: {
    borderBottom: '1px solid #F5F7F8',
    marginBottom: 32,
  },
  connectedWalletDetails: {
    '& > div': {
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      '& > span': {
        fontFamily: 'MuliRegular',
        fontSize: 16,
        lineHeight: '20px',
        '&:firt-of-type': {
          color: `${theme.palette.textAdvanced.grey3}`,
        },
        '&:last-of-type': {
          marginLeft: 11,
          padding: '5px 12px',
          borderRadius: 20,
          backgroundColor: 'rgba(204,180,225,0.1)',
          color: `${theme.palette.common.black1}`,
          letteSpacing: -0.09,
        },
      },
    },
  },
  accountNo: {
    marginBottom: 10,
    color: `${theme.palette.common.black1}`,
    fontFamily: 'MuliRegular',
    fontSize: 14,
    lineHeight: '24px',
    wordBreak: 'break-all',
    '& svg': {
      marginRight: 8,
      fontSize: 20,
      verticalAlign: 'middle',
    },
  },
  copyDisconnectBtnContainer: {
    '& button': { padding: '15px 20px 13px 10px' },
  },
  copyBtn: { color: `${theme.palette.alertMsg.pendingBorder}`},
  disconnectBtn: { color: `${theme.palette.textAdvanced.red}` },
  cardanoAccDetails: {
    '& p': {
      '&:first-of-type': {
        color: `${theme.palette.textAdvanced.dark}`,
        fontFamily: 'MuliRegular',
        fontSize: 14,
        lineHeight: '24px',
      },
      '&:last-of-type': {
        color: `${theme.palette.common.grey1}`,
        fontFamily: 'MuliRegular',
        fontSize: 13,
        letterSpacing: -0.14,
        lineHeight: '16px',
      },
    },
  },
  cardanoWalletList: {
    width: '100%',
    padding: 0,
    margin: '16px 0',
    display: 'flex',
    alignItems: 'flex-start',
    '& li': {
      width: 'auto',
      padding: 0,
      marginRight: '16px',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      '&:last-of-type': { marginRight: 0 },
      '& img': {
        boxSizing: 'content-box',
        width: 54,
        height: 54,
        borderRadius: '6px',
        border: '1px solid #D6D6D6',
        padding: 7,
        backgroundColor: '#FFF',
        boxShadow: '0 0 8px 0 rgba(173,180,180,0.24)',
        '&:hover': {
          border: '1px solid #4F13E0',
          backgroundColor: 'rgba(79,19,224,0.1)',
        },
      },
      '& span': {
        marginTop: 7,
        color: `${theme.palette.textAdvanced.dark}`,
        fontFamily: 'MuliRegular',
        fontSize: 14,
        lineHeight: '24px',
        textAlign: 'center',
      },
    },
    '@media(max-width: 540px)': { flexDirection: 'column' },
  },
  accountModalDialogActions: {
    padding: '32px 20px !important',
    justifyContent: 'center !important',
    background: `${theme.palette.textAdvanced.grey2}`,
    '& p': {
      color: `${theme.palette.common.grey1}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 13,
      letterSpacing: -0.14,
      lineHeight: '16px',
      '& a': { color: `${theme.palette.alertMsg.pendingBorder}` },
    },
  },
}));

export default useStyles;
