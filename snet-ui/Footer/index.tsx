import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Box, Button, TextField } from '@mui/material';
import footerStyles from './styles';
import PrimaryFooterMainLinks from './constants';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

type FooterProps = {
  handleScrollToLink: (scrollToKey?: string) => void;
};

function Footer({ handleScrollToLink }: FooterProps) {
  const [email, setEmail] = useState('');
  const classes = footerStyles();

  const handleEmailChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setEmail(event.target.value);
  };

  return (
    <Container className={classes.footerMainContainer}>
      <Box className={classes.footerWrapper}>
        <Box className={classes.primaryFooter}>
          <Box className={classes.logoSection}>
            <Box className={classes.logo}>
              <img alt="SingularityNET" src="SNET Logo.png" />
              <span>Home of Benevolent AI & AGI</span>
            </Box>
            <Box className={classes.socialIconsNewsletterContainer}>
              <ul>
                <li>
                  <a href="#" title="Telegram">
                    <TelegramIcon />
                  </a>
                </li>
                <li>
                  <a href="#" title="Twiiter">
                    <TwitterIcon />
                  </a>
                </li>
                <li>
                  <a href="#" title="LinkedIn">
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a href="#" title="Facebook">
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href="#" title="Youtube">
                    <YouTubeIcon />
                  </a>
                </li>
              </ul>
              <Box className={classes.newsLetterContainer}>
                <span>Subscribe to Newsletter</span>
                <Box>
                  <TextField value={email} placeholder="johndoe@gmail.com" onChange={handleEmailChange} fullWidth />
                  <Button>join</Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.footerRightSideLinks}>
            {PrimaryFooterMainLinks.map((item) => (
              <ul key={item.label} className={classes.footerLinksContainer}>
                <span className={classes.footerLinksTitle}>{item.title}</span>
                {item.children.map((child) => (
                  <li className={classes.footerLinks} key={child.label}>
                    <a
                      href={child.link}
                      title={child.label}
                      target={child.internalLink ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </Box>
        </Box>
        <Grid container className={classes.secondaryFooter}>
          <Grid item sm={12}>
            <span>© 2022 SingularityNET.</span>
            <p>
              <a href="#" title="Cookie concent policy">
                Cookie concent policy
              </a>{' '}
              and{' '}
              <a href="#" title="Privacy Policy">
                Privacy Policy.
              </a>
            </p>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Footer;
