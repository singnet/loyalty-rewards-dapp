import { Theme } from '@mui/material/styles'; 
import { listOfAirDropStatusType } from "./constants";

export default (theme: Theme): any => ({
  eligibilityBannerContainer: { 
		padding: '16px 38px 23px',
		borderRadius: 8,
		marginBottom: 8,
		backgroundColor: `${theme.palette.bgHighlight.main}`
	},
	airDropStatusContainer: {
		paddingBottom: 10,
		borderBottom: '1px solid #D6D6D6',
		display: 'flex',
		'& span': { 
			marginRight: 12,
			color: `${theme.palette.textAdvanced.dark}`
		},
		[`& h5[data-airdrop-status-type="${listOfAirDropStatusType.WALLET_ACCOUNT_ERROR}"]`]: { color: `${theme.palette.error.main}` },
		[`& h5[data-airdrop-status-type="${listOfAirDropStatusType.REGISTRATION_CLOSED}"]`]: { color: `${theme.palette.common.grey}` },
		[`& h5[data-airdrop-status-type="${listOfAirDropStatusType.ELIGIBLE_TO_MAP_CARDANO_WALLET}"],
			& h5[data-airdrop-status-type="${listOfAirDropStatusType.REGISTRATION_OPEN}"]`]: { 
				color: `${theme.palette.alertMsg.successGreen}`
		}
	},
	walletDetailsContainer: {
		padding: '0 16px',
		display: 'flex',
		alignItems: 'center',
		'& div': {
			marginLeft: 12,
			color: `${theme.palette.textAdvanced.dark}`,
			'& span': {
				marginBottom: 5,
				display: 'inline-block',
				// fontFamily: `${theme.palette.typography.fontFamily.secondary}`,
				fontSize: 14,
				lineHeight: '24px',
			},
			'& h5': { 
				lineHeight: '29px',
				textTransform: 'capitalize'
			},
			'& h6': { 
				fontStyle: 'italic',
				fontSize: 18,
				fontWeight: 400,
				lineHeight: '29px',
				textTransform: 'capitalize'
			}
		}
	}
});