import { Theme } from '@mui/material/styles';

export default (theme: Theme): any => ({
  successMsg: {
    border: `1px solid ${theme.palette.alertMsg.successBorder} !important`,
    backgroundColor: `${theme.palette.alertMsg.successBg} !important`,
  },
  pandingMsg: {
    border: `1px solid ${theme.palette.alertMsg.pendingBorder} !important`,
    backgroundColor: `${theme.palette.alertMsg.pendingBg} !important`,
  },
  alertBox: {
    padding: '12px 24px',
    borderRadius: 4,
    width: '620px',
    // alignItems: 'center',
    // justifyContent: 'flex-start !important',
    border: `1px solid ${theme.palette.alertMsg.errorBorder}`,
    backgroundColor: `${theme.palette.alertMsg.errorBg}`,
    '& div': { padding: 0 },
    '& p': {
      border: 'none',
      margin: 0,
      color: `${theme.palette.text.primary} !important`,
      fontSize: 14,
      lineHeight: '21px',
    },
    '& a': {
      paddingLeft: 5,
      '&:hover': { textDecoration: 'underline' },
    },
  },
});
