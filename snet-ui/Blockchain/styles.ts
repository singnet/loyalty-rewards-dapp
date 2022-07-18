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
        '& h5': {
          color: `${theme.palette.primary.main}`,
          fontFamily: 'MuliSemiBold',
        },
        '& button': {
          position: "absolute",
          right: 8,
          top: 8,
          color: `${theme.palette.textAdvanced.dark}`,
        }
      }
    }
   }
}));

export default useStyles;
