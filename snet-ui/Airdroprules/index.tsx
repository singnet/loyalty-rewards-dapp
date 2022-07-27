import React from 'react';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { Box } from '@mui/system';
import { Container, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Divider from '@mui/material/Divider';
import rulesStyles from './styles';

type Step = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  steps: Step[];
  blogLink?: string;
};

function Airdroprules({ title, steps, blogLink }: Props, ref) {
  const classes = rulesStyles();

  if (!steps || !(steps.length > 0)) {
    return null;
  }

  return (
    <Grid className={classes.rulesContainer}>
      <Container>
        <Typography align="center" variant="h2">
          {title}
        </Typography>
        <Box className={classes.rulesContentContainer}>
          {steps.map((step, index) => (
            <Box className={classes.rulesContent}>
              <Box>
                <StarsOutlinedIcon />
                <Typography variant="h4">{step.title}</Typography>
              </Box>
              <Typography>{step.description}</Typography>
            </Box>
          ))}
        </Box>
        <Box className={classes.btnContainer}>
          {blogLink ? (
          <Button
            variant="outlined"
            endIcon={<OpenInNewIcon />}
            href={blogLink}
            target="_blank"
            rel="noreferrer noopener"
          >
            Read Blog Post
          </Button>
          ) : null}
        </Box>
      </Container>
    </Grid>
  );
}

export default React.forwardRef(Airdroprules);
