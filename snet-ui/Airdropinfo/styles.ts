import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  airDropInfoContainer: {
    paddingRight: 10,
    '& h1': {
      marginTop: 44,
      color: `${theme.palette.bgtext.main}`,
      fontFamily: 'MuliSemiBold',
      "@media (max-width:900px)": { marginTop: 0 },
    },
    '& h5': {
      margin: '50px 0 87px',
      fontWeight: 400,
      lineHeight: '29px',
      fontFamily: 'MuliRegular',
      color: `${theme.palette.textAdvanced.dark}`,
      "@media (max-width:900px)": { margin: '25px 0' },
    },
    '& a': {
      border: '1px solid #4086FF',
      borderRadius: 3,
      color: `${theme.palette.alertMsg.pendingBorder}`,
      fontFamily: 'MuliSemiBold',
      '&:hover': {
        border: '1px solid #4086FF',
        backgroundColor: 'rgba(64, 134, 255, 0.04)'
      },
      '@media(max-width: 900px)': { marginBottom: 25 }
    },
  },
}));

export default useStyles;
