import { Theme } from '@mui/material/styles';

export default (theme: Theme): any => ({
  registrationBox: {
	 padding: '40px 42px',
		borderRadius: 8,
    background: 'linear-gradient(45deg, #2E1C89 0%, #492C92 100%),radial-gradient(circle, rgba(29,91,189,0.5) 0%, rgba(0,0,0,0) 100%),radial-gradient(circle, #B03FC3 0%, rgba(0,0,0,0) 100%),radial-gradient(circle, #184FA7 0%, #103884 41.67%, #061753 100%)' 
	},
	connectWalletBtn: {
		'& button': { backgroundColor: '#4086ff' }
	}
});
