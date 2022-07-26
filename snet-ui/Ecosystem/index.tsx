import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { Grid, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GradientBox from '../../snet-ui/GradientBox';
import Container from '@mui/material/Container';
import colors from '../Theme/colors';
import ecoSystemStyles from './styles';

type Props = {
  blogLink?: string;
};

export default function Ecosystem({ blogLink }: Props) {
  const classes = ecoSystemStyles();
  return (
    <Grid className={classes.ecoSystemContainer}>
      <Box className={classes.wrapper}>
        <Typography align="center" variant="h2">
          SingularityNET Ecosystem
        </Typography>
        <Typography>
          SingularityNET hosts an ecosystem of different technology projects in different areas with the common theme of
          accelerating to the future and to the Technological Singularity in a beneficial way under decentralized
          democratic control. Click here to read more about our other ecosystem projects, including Rejuve, Mindplex,
          SingularityDAO, and TrueAGI.
        </Typography>
        <Box className={classes.btnContainer}>
          {blogLink ? (
            <Button
              className={classes.visitBtn}
              variant="contained"
              endIcon={<OpenInNewIcon />}
              href={blogLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit SingularityNet
            </Button>
          ) : null}
          {blogLink ? (
            <Button
            className={classes.viewAllBtn}
              variant="outlined"
              color="bgHighlight"
              endIcon={<OpenInNewIcon />}
              href={blogLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              View All Airdrops
            </Button>
          ) : null}
        </Box>
      </Box>
    </Grid>
  );
}
