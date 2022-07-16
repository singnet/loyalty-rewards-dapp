import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((Theme) => ({
  registrationMainContainer: {
    maxWidth: '1160px',
    padding: 0,
    margin: '160px auto 0',
    '& > div': {
      width: '100%',
      margin: 'auto 0',
      '& > div': { padding: '0 !important' },
    },
    '@media(max-width: 1023px)': { padding: '0 20px' },
    '@media(max-width: 640px)': { margin: '200px auto 0' },
  },
}));

export default useStyles;
