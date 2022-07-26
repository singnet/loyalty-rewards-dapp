import React, { forwardRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import MuiTextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import LoadingButton from '../../snet-ui/LoadingButton';
import { APIError, ValidationError } from '../../utils/errors';
import { AlertTypes } from '../../utils/constants/alert';
import { Alert, AlertTitle, Container } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import getUpdateNotificationStyles from './styles';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const TextField = styled(MuiTextField)`
  & svg,
  input {
    color: ${({ theme }) => theme.palette.textAdvanced.dark};
  }
`;

type SubscribeToNotificationProps = {
  onSubscribe: (email: string) => void;
};

function SubscribeToNotification({ onSubscribe }: SubscribeToNotificationProps, ref) {
  const [email, setEmail] = useState('');
  const [subscriptionLoader, setSubscriptionLoader] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    severity: AlertTypes.info,
    message: '',
  });
  const classes = getUpdateNotificationStyles();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAlertMessage({ severity: AlertTypes.error, message: '' });
    try {
      if (!validateEmail(email)) {
        throw new ValidationError('invalid email');
      }
      setSubscriptionLoader(true);

      await onSubscribe(email);
      setAlertMessage({
        severity: AlertTypes.success,
        message: 'Successfully subcribed for updates',
      });
    } catch (error) {
      if (error instanceof APIError || error instanceof ValidationError) {
        console.log('error', error);
        setAlertMessage({ severity: AlertTypes.error, message: error.message });
        return;
      }
      console.log('error', error);
      setAlertMessage({
        severity: AlertTypes.error,
        message: 'Unable to subscribe. Please try again later',
      });
    } finally {
      setSubscriptionLoader(false);
    }
  };

  return (
    <Grid className={classes.getUpdateNotificationContainer} ref={ref}>
      <Container>
        <Typography align="center" variant="h2">
          Get Update Notifications
        </Typography>
        <Grid
          container
          component="form"
          spacing={2}
          onSubmit={handleSubscribe}
          className={classes.getUpdateNotificationForm}
        >
          <TextField
            name="EMAIL"
            InputProps={{
              startAdornment: <EmailOutlinedIcon />,
            }}
            placeholder="Please enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscriptionLoader}
          />
          <LoadingButton
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleSubscribe}
            loading={subscriptionLoader}
            sx={{ width: '120px', height: '52.5px', textTransform: 'capitalize', fontWeight: 600 }}
          >
            Subscribe
          </LoadingButton>
        </Grid>
        {alertMessage.message ? (
          <Box className={classes.alertBoxContainer}>
            <Alert icon={<ErrorOutline />} severity="error">
              <AlertTitle>alertMessagemessage</AlertTitle>
            </Alert>
          </Box>
        ) : null}
      </Container>
    </Grid>
  );
}

export default forwardRef(SubscribeToNotification);
