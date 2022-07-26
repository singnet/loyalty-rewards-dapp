import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const howItWorksStyles = makeStyles((theme: Theme) => ({
  howItWorksContainer: {
    padding: '63px 0',
    backgroundColor: `${theme.palette.bgHighlight.main}`,
    '& h2': {
      color: `${theme.palette.info.main}`,
      fontFamily: 'MuliBold',
    },
  },
  wrapper: {
    maxWidth: 1160,
    width: '100%',
    margin: '0 auto',
    '@media(max-width:1200px)': { padding: '0 20px' },
  },
  howItWorksContent: {
    padding: 0,
    margin: '40px 0',
    display: 'flex',
    flexWrap: 'wrap',
    '& li': {
      width: '50%',
      marginBottom: 25,
      display: 'flex',
      alignItems: 'flex-start',
      listStyle: 'none',
      '&:nth-child(odd)': {
        paddingRight: 24,
        '&:last-of-type': { margin: 0 },
      },
      '&:last-of-type': { margin: 0 },
      '@media(max-width:900px)': { width: '100%' },
    },
    '@media(max-width:900px)': { flexDirection: 'column' },
  },
  noContainer: {
    padding: '6px 7px',
    borderRadius: 4,
    marginRight: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${theme.palette.bgBox.smallBox}`,
    '& span': {
      color: `${theme.palette.common.white}`,
      fontFamily: 'MuliRegular',
      fontSize: 10,
      lineHeight: '13px',
    },
    '& h3': {
      color: `${theme.palette.bgHighlight.main}`,
      fontFamily: 'MuliSemiBold',
    },
  },
  actualContent: {
    '& span': {
      color: `${theme.palette.bgtext.maine}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 18,
      lineHeight: '24px',
    },
    '& p': {
      padding: '17px 0 25px',
      color: `${theme.palette.textAdvanced.dark}`,
      fontFamily: 'MuliRegular',
      fontSize: 14,
      lineHeight: '24px',
    },
  },
  btnContainer: {
    textAlign: 'center',
    '& button': {
      borderColor: `${theme.palette.alertMsg.pendingBorder}`,
      color: `${theme.palette.alertMsg.pendingBorder}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 14,
      lineHeight: '24px',
      '&:hover': {
        borderColor: `${theme.palette.alertMsg.pendingBorder}`,
      },
    },
  },
}));

export default howItWorksStyles;
