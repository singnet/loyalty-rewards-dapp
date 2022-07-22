import { Theme } from '@mui/material/styles';
import listOfAirDropStatusType from './constants';

export default (theme: Theme): any => ({
  eligibilityBannerContainer: {
    padding: '16px 38px 23px',
    borderRadius: 8,
    margin: '160px 0 8px',
    backgroundColor: `${theme.palette.bgHighlight.main}`,
    '@media(max-width:900px)': {
      width: '83%',
      margin: '160px auto 8px',
    },
    '@media(max-width:640px)': { marginTop: 210 },
  },
  airDropStatusContainer: {
    paddingBottom: 10,
    borderBottom: '1px solid #D6D6D6',
    display: 'flex',
    '& span': {
      marginRight: 12,
      color: `${theme.palette.textAdvanced.dark}`,
      fontFamily: 'MuliRegular',
    },
    '& h5': { fontFamily: 'MuliSemiBold' },
    [`& h5[data-airdrop-status-type="${listOfAirDropStatusType.WALLET_ACCOUNT_ERROR}"]`]: {
      color: `${theme.palette.error.main}`,
    },
    [`& h5[data-airdrop-status-type="${listOfAirDropStatusType.REGISTRATION_CLOSED}"]`]: {
      color: `${theme.palette.common.grey}`,
    },
    [`& h5[data-airdrop-status-type="${listOfAirDropStatusType.ELIGIBLE_TO_MAP_CARDANO_WALLET}"],& h5[data-airdrop-status-type="${listOfAirDropStatusType.REGISTRATION_OPEN}"],& h5[data-airdrop-status-type="${listOfAirDropStatusType.CLAIM_OPEN}"]`]: {
      color: `${theme.palette.alertMsg.successGreen}`,
    },
  },
  walletDetailsContainer: {
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    '& div': {
      '& > img': { objectFit: 'contain' },
      marginLeft: 12,
      color: `${theme.palette.textAdvanced.dark}`,
      '& span': {
        marginBottom: 5,
        display: 'inline-block',
        fontFamily: 'MontserratRegular',
        fontSize: 14,
        lineHeight: '24px',
      },
      '& p': {
        fontFamily: 'MuliRegular',
        '& svg': {
          marginLeft: 10,
          color: `${theme.palette.alertMsg.pendingBorder}`,
          fontSize: 15,
          cursor: 'pointer',
          verticalAlign: 'middle',
        },
      },
      '& h5': {
        fontFamily: 'MuliBold',
        lineHeight: '29px',
        textTransform: 'capitalize',
      },
      '& h6': {
        fontFamily: 'MuliRegular',
        fontStyle: 'italic',
        fontSize: 18,
        fontWeight: 400,
        lineHeight: '29px',
      },
    },
  },
  walletDetailsMainGrid: {
    '@media(max-width: 1240px)': { flexDirection: 'column' },
  },
});
