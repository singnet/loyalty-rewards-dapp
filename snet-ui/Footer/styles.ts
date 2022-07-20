import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const footerStyles = makeStyles((theme: Theme) => ({
  footerMainContainer: {
    maxWidth: '100%',
    paddingTop: 49,
    background: `${theme.palette.background.purple}`,
  },
  footerWrapper: {
    width: 1160,
    padding: 0,
    margin: '0 auto',
  },
  logoSection: {
    '& img': { width: 232 },
    '& > span': {
      margin: '12px 0 24px',
      display: 'block',
      color: '#EFE3F1',
      fontFamily: 'MuliLight',
      fontSize: 16,
      fontStyle: 'italic',
      fontWeight: 200,
      letterSpacing: -0.08,
      lineHeight: '14px',
    },
    '& ul': {
      padding: 0,
      margin: 0,
      display: 'flex',
      '& li': {
        marginRight: 14,
        listStyle: 'none',
        '& svg': {
          boxSizing: 'content-box',
          padding: 7,
          borderRadius: '50%',
          backgroundColor: `${theme.palette.alertMsg.pendingBorder}`,
          color: `${theme.palette.common.white}`,
          fontSize: 19,
          '&:hover': { backgroundColor: '#7F1BA4' },
        },
        '&:last-of-type': { marginRitgh: 0 },
      },
    },
  },
  newsLetterContainer: {
    marginTop: 56,
    '& span': {
      marginBottom: 9,
      display: 'block',
      color: '#B3B0B0',
      fontFamily: 'MuliSemiBold',
      fontSize: 14,
      lineHeight: '18px',
    },
  },
}));

export default footerStyles;
