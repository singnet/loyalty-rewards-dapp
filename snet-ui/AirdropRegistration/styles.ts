import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const airdropRegistrationStyles = makeStyles((Theme) => ({
  airdropClaimStartDateTime: {
    margin: 0,
    '& h4': { fontFamily: 'MuliSemiBold' },
  },
  viewBtnsContainer: {
    marginTop: 24,
    textAlign: 'center',
    '& button': {
      border: '1px solid #f4f8ff',
      marginRight: 24,
      '& p': { fontFamily: 'MuliSemiBold' },
      '&:last-of-type': { marginRight: 0 },
      '&:hover': {
        border: '1px solid #f4f8ff',
      },
    },
  },
  claimedContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    borderColor: Theme.palette.text.secondary,
  },
}));

export default airdropRegistrationStyles;
