import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const rulesStyles = makeStyles((theme: Theme) => ({
  rulesContainer: {
    padding: '64px 0',
    '& h2': {
      color: `${theme.palette.info.main}`,
      fontFamily: 'MuliBold',
    },
  },
  rulesContentContainer: {
    maxWidth: 963,
    margin: '55px auto 0',
  },
  rulesContent: {
    padding: '20px 0',
    borderBottom: '1px solid rgb(66 66 66 / 25%)',
    '& div': {
      display: 'flex',
      '& svg': { color: `${theme.palette.info.light}` },
      '& h4': {
        marginLeft: 8,
        color: `${theme.palette.bgtext.main}`,
        fontFamily: 'MuliSemiBold',
        fontSize: 18,
        lineHeight: '24px',
      },
    },
    '& p': {
      paddingTop: 20,
      color: `${theme.palette.textAdvanced.dark}`,
      fontFamily: 'MuliRegular',
      fontSize: 14,
      lineHeight: '24px',
    },
    '&:first-of-type': { paddingTop: 0 },
    '&:last-of-type': {
      paddingBottom: 0,
      borderBottom: 'none',
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
export default rulesStyles;
