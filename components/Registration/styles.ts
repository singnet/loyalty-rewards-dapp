import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((Theme) => ({
  registrationMainContainer: {
    maxWidth: '1160px',
    padding: 0,
    margin: '0 auto',
    '& > div': {
      width: '100%',
      margin: 'auto 0',
      '& > div': { padding: '0 !important' }
    },
    '@media(max-width: 1023px)': { padding: '0 20px' }
  },
}));

export default useStyles;
