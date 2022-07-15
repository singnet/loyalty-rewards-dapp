import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const blockChainStyles = makeStyles((theme: Theme) => ({
  connectWalletDialog: {
    '& .MuiPaper-elevation': {
      maxWidth: 800,
      width: '100%',
      margin: 0,
      boxShadow: 'none',
      '& h5': {
        fontFamily: 'MuliSemiBold',
        '& + button': {
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'rgba(0, 0, 0, .87)',
        },
      },
    },
  },
  connectWalletDialogContent: {
    padding: '24px 17px 21px',
    '& > div': {
      width: '100%',
      margin: 0,
      '& > div': {
        padding: '0 !important',
        '& button': {
          padding: '60px 24px',
          borderRadius: 6,
          backgroundColor: `${theme.palette.common.white}`,
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          '& div': { padding: 0 },
          '& > h5': {
            padding: '10x 0 8px',
            color: `${theme.palette.primary.main}`,
          },
          '& span': {
            color: `${theme.palette.textAdvanced.grey}`,
            fontFamily: 'MuliRegular',
            fontSize: 14,
            lineHeight: '24px',
          },
        },
      },
    },
  },
}));

export default blockChainStyles;
