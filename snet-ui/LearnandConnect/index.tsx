import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { AIRDROP_LINKS } from 'utils/airdropWindows';
import useStyles from './styles';
import { data } from './constants';
import { LibraryAddCheck } from '@mui/icons-material';

export default function Learn() {
  const classes = useStyles();
  return (
    <Grid container className={classes.learnConnectContainer}>
      <Box className={classes.wrapper}>
        <Typography align="center" variant="h2">
          Learn and Connect with the Community
        </Typography>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ul className={classes.learnConnectContentContainer}>
            {data.map((item, key) => (
              <li className={classes.learnConnectCard}>
                <a href={AIRDROP_LINKS.WHITEPAPER} rel="noopener noreferrer" target="_blank">
                  <img src={item.img} alt={item.title} />
                </a>
                <Typography component="span">{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
      </Box>
    </Grid>
  );
}
