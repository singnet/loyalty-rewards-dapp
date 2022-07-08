import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const airdropRegistrationStyles = makeStyles((Theme) => ({
  airdropClaimStartDateTime: { 
    margin: 0,
    '& h4': { fontFamily: 'MuliSemiBold'}
  }
}));

export default airdropRegistrationStyles;
