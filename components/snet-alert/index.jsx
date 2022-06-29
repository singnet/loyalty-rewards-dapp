import Alert from '@mui/material/Alert';
import propTypes from 'prop-types';
import { useMemo } from 'react';
import { useStyles } from './styles';
import WarningIcon from '@mui/icons-material/Warning';

const SnetAlert = ({ error, type = 'error' }) => {
  const classes = useStyles();

  const className = useMemo(() => {
    switch (type) {
      case 'success':
        return classes.successMsg;
      case 'info':
        return classes.pandingMsg;
      default:
        return {};
    }
  });

  const icon = useMemo(() => {
    if (type === 'error') {
      return <WarningIcon sx={{ color: '#D23346' }} />;
    }
    return false;
  });

  return (
    <Alert icon={icon} severity={type} variant="outlined" className={`${classes.alertBox} ${className}`}>
      <p>{error}</p>
    </Alert>
  );
};

SnetAlert.propTypes = {
  error: propTypes.string.isRequired,
  type: propTypes.string,
  iconPresence: propTypes.bool,
};

export default SnetAlert;
