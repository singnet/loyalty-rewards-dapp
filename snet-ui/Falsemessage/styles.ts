import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const falseMessageStyles = makeStyles((theme: Theme) => ({
  falseMsgContainer: {
    background: `${theme.palette.headerBlue.main}`,
    textAlign: 'center',
  },
  message: {
    padding: '4px 10px',
    color: `${theme.palette.common.white}`,
    fontFamily: 'MuliRegular',
    lineHeight: '24px',
  },
}));

export default falseMessageStyles;
