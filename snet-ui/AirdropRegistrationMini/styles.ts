import { Theme } from '@mui/material/styles';

export default (theme: Theme): any => ({
  registrationBox: {
	width: 470,
	borderRadius: 8,
	padding: '40px 42px',
	margin: '0 0 0 auto',
    background: 'linear-gradient(45deg, #2E1C89 0%, #492C92 100%),radial-gradient(circle, rgba(29,91,189,0.5) 0%, rgba(0,0,0,0) 100%),radial-gradient(circle, #B03FC3 0%, rgba(0,0,0,0) 100%),radial-gradient(circle, #184FA7 0%, #103884 41.67%, #061753 100%)' 
	},
	connectWalletBtn: {
		marginTop: 48,
		textAlign: 'center',
		'& button': { backgroundColor: '#4086ff' }
	},
	registrationInfoMsg: {
		color: '#F4F8FF',
		fontFamily: 'Muli',
		fontSize: 20,
		fontWeight: 600,
		lineHeight: '24px',
		textAlign: 'center',
		'& span':{
			marginTop: 8,
			display: 'block'
		}
	},
	airdropDetails: {
		padding: '25px 0',
		borderTop: '1px solid #fff',
		borderBottom: '1px solid #fff',
		marginTop: 70,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		'& div': {
			'&:first-of-type': { paddingLeft: 7 },
			'&:last-of-type': { paddingRight: 17 }
		}
	}
});
