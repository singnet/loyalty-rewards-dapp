import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const ecoSystemStyles = makeStyles((theme: Theme) => ({
  ecoSystemContainer: {
    padding: '67px 0 65px',
    background: `${theme.palette.bgGradient.purple}`,
    '& h2': {
      marginBottom: 45,
      color: `${theme.palette.text.secondary}`,
      fontFamily: 'MuliBold',
    },
    '& p': {
      color: `${theme.palette.text.secondary}`,
      fontFamily: 'MuliRegular',
      fontSize: 18,
      lineHeight: '29px',
    },
  },
  wrapper: {
    width: 963,
    margin: '0 auto',
    '@media(max-width: 970px)': { width: '90%' },
  },
  btnContainer: {
    marginTop: 40,
    textAlign: 'center',
    '& a': {
      padding: '8px 15px',
      marginRight: 13,
      color: `${theme.palette.text.secondary}`,
      fontFamily: 'MuliSemiBold',
      '&:last-of-type': { margin: 0 },
    },
  },
  visitBtn: {
    backgroundColor: `${theme.palette.alertMsg.pendingBorder}`,
    '&:hover': {
      backgroundColor: 'rgb(44, 93, 178)',
    },
  },
}));

export default ecoSystemStyles;
