import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  registrationMainContainer: {
    maxWidth: '1160px',
    padding: 0,
    margin: '160px auto 0',
    '& > div': {
      width: '100%',
      margin: '0 auto 64px',
      '& > div': { padding: '0 !important' },
    },
    '@media(max-width: 1023px)': { padding: '0 20px' },
    '@media(max-width: 640px)': { margin: '200px auto 0' },
  },
  successModal: { backgroundColor: '##00000080' },
  successGradientBox: {
    width: 802,
    borderRadius: 4,
    background:
      'linear-gradient(45deg, #2E1C89 0%, #492C92 100%), radial-gradient(circle, rgba(29,91,189,0.5) 0%, rgba(0,0,0,0) 100%), radial-gradient(circle, #B03FC3 0%, rgba(0,0,0,0) 100%), radial-gradient(circle, #184FA7 0%, #103884 41.67%, #061753 100%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& img': { width: '100%' },
    '& > div': {
      padding: '0 83px 0 86px',
      '@media(max-width: 640px)': { padding: '0 10%' },
      '& h2': {
        color: `${theme.palette.alertMsg.pendingBorder}`,
        fontFamily: 'MuliBold',
        textAlign: 'center',
      },
      '& h4': {
        padding: '30px 0',
        color: `${theme.palette.text.secondary}`,
        fontFamily: 'MuliSemiBold',
        textAlign: 'center',
      },
      '& > div': {
        '& p': {
          color: `${theme.palette.text.secondary}`,
          fontFamily: 'MontserratRegular',
          fontSize: 14,
          lineHeight: '24px',
          wordBreak: 'break-word',
        },
        '& svg': {
          marginLeft: 13,
          fontSize: 20,
          verticalAlign: 'middle',
        },
      },
    },
    '@media(max-width: 800px)': { width: '90%' },
  },
  // Loader Modal
  loaderModal: {
    width: 410,
    height: 252,
    paddingBottom: 80,
    borderRadius: 4,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: `${theme.palette.background.paper}`,
    boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    '& img': { width: '100%' },
    '& p': {
      color: `${theme.palette.common.black1}`,
      fontFamily: 'MuliRegular',
      fontSize: 14,
      lineHeight: '24px',
      textAlign: 'center',
    },
    '@media(max-width: 400px)': {
      width: '90%',
      padding: '0 20px 80px',
    },
  },
  awesomeBtn: {
    padding: '8px 65px !important',
    margin: '40px auto 80px',
    display: 'flex',
    borderRadius: 3,
    backgroundColor: `${theme.palette.alertMsg.pendingBorder} !important`,
    color: `${theme.palette.text.secondary}`,
    fontFamily: 'MuliSemiBold',
    fontSize: 14,
    lineHeight: '24px',
  },
}));

export default useStyles;
