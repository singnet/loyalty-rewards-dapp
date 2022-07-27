import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const scheduleStyles = makeStyles((theme: Theme) => ({
  scheduleContainer: {
    padding: '64px 0',
    backgroundColor: `${theme.palette.bgHighlight.main}`,
    '& h2': {
      color: `${theme.palette.info.main}`,
      fontFamily: 'MuliBold',
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
  timeLineContainer: {
    width: 973,
    padding: 0,
    margin: '55px auto 0',
    '& .MuiTimelineContent-root': { padding: 0 },
    '@media(max-width: 980px)': { width: '90%' },
  },
  timeLineSepator: {
    padding: 0,
    '& .MuiTimelineDot-filled ': {
      width: 20,
      height: 20,
      border: 'none',
      margin: 0,
      background: `${theme.palette.info.light}`,
    },
    '& .MuiTimelineConnector-root': {
      '& p': {
        paddingLeft: 8,
        marginTop: 60,
        backgroundColor: `${theme.palette.bgHighlight.main}`,
        color: `${theme.palette.info.light}`,
        fontFamily: 'MuliSemiBold',
        fontSize: 18,
        lineHeight: '24px',
      },
    },
  },
  scheduleContent: {
    flexWrap: 'nowrap',
  },
  scheduleTime: {
    marginLeft: 8,
    '& h6': {
      color: `${theme.palette.info.light}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 18,
      lineHeight: '24px',
    },
  },
  scheduleDetails: {
    '& span': {
      color: `${theme.palette.info.light}`,
      fontFamily: 'MuliSemiBold',
      fontSize: 18,
      lineHeight: '24px',
    },
    '& p': {
      paddingTop: 20,
      color: `${theme.palette.textAdvanced.dark}`,
      fontFamily: 'MuliRegular',
      fontSize: 14,
      lineHeight: '24px',
    },
  },
}));
export default scheduleStyles;
