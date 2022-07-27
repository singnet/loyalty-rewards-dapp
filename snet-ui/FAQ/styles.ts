import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  faqContainer: {
    padding: '63px 0',
    backgroundColor: `${theme.palette.bgFocus.main}`,
    '& h2': {
      color: `${theme.palette.info.main}`,
      fontFamily: 'MuliBold',
    },
  },
  accordionContainer: {
    width: 965,
    margin: '55px auto 40px',
    '& .Mui-expanded': {
      backgroundColor: `${theme.palette.bgFocus.main}`,
    },
    '& .MuiAccordionSummary-root': { padding: '0 24px' },
    '& .MuiAccordionSummary-content': {
      padding: '24px 0',
      margin: 0,
      '& p': {
        color: `${theme.palette.primary.main}`,
        fontFamily: 'MuliSemiBold',
        fontSize: 18,
        lineHeight: '24px',
      },
    },
    '& .MuiAccordionDetails-root': {
      padding: '0 40px 23px',
      '& p': {
        color: `${theme.palette.textAdvanced.dark}`,
        fontFamily: 'MuliRegular',
        fontSize: 14,
        lineHeight: '24px',
      },
    },
    '@media(max-width: 970px)': { width: '94%' },
  },
  btnContainer: {
    textAlign: 'center',
    '& p': {
      marginBottom: 8,
      color: `${theme.palette.textAdvanced.dark}`,
      fontFamily: 'MontserratRegular',
      fontSize: 14,
      lineHeight: '24px',
    },
    '& a': {
      borderColor: `${theme.palette.alertMsg.pendingBorder}`,
      '& h6': {
        color: `${theme.palette.alertMsg.pendingBorder}`,
        fontFamily: 'MuliSemiBold',
        fontSize: 14,
        lineHeight: '24px',
      },
      '&:hover': {
        borderColor: `${theme.palette.alertMsg.pendingBorder}`,
      },
    },
  },
}));

export default useStyles;
