import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  successMsg: {
    border: `1px solid #00C48C !important`,
    backgroundColor: `#E7FFF8 !important`,
  },
  pandingMsg: {
    border: `1px solid #4086FF !important`,
    backgroundColor: `#DEEAFF !important`,
  },
  alertBox: {
    borderRadius: 4,
    width: '620px',
    alignItems: 'center',
    justifyContent: 'flex-start !important',
    border: `1.5px solid #D23346`,
    backgroundColor: '#FDE5E8',
    '& p': {
      border: 'none',
      margin: 0,
      color: `#000000 !important`,
      fontSize: 14,
      letterSpacing: -0.01,
      lineHeight: '24px',
    },
    '& a': {
      paddingLeft: 5,
      '&:hover': { textDecoration: 'underline' },
    },
  },
});
