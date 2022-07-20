import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { AIRDROP_LINKS, AIRDROP_SITE_STRING } from 'utils/airdropWindows';
import { Container, Link, Box, Button, TextField } from '@mui/material';
import footerStyles from './styles';
import { LinksData } from './constants';
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
        <Grid container className={classes.primaryFooter}>
          <Grid item xs={12} sm={4} className={classes.logoSection}>
            <img alt="SingularityNET" src="SNET Logo.png" />
            <span>Home of Benevolent AI & AGI</span>
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
          </Grid>
          {/* {LinksData.map((linkItem) => (
            <Grid item xs={12} sm={3} key={linkItem.header}>
              <List
                subheader={
                  <Typography variant="h3">{linkItem.header}</Typography>
                }
              >
                {linkItem.links.map((link) => (
                  <ListItemButton
                    component={link.scrollToKey ? 'b' : 'a'}
                    href={link.url}
                    target={link.external ? '_blank' : ''}
                    rel={link.external ? 'noreferrer noopener' : ''}
                    key={link.text}
                    onClick={() => handleScrollToLink(link.scrollToKey)}
                  >
                    <Typography variant="body1" sx={{ m: 2, mt: 0, mb: 0 }}>
                      {link.text}
                    </Typography>
                  </ListItemButton>
                ))}
              </List>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </Container>
  );
}

export default Footer;

{
  /* <li className={classes.socialIconsLink}>
      <a href={item.link} title={item.title} className={classes.socialIcon} target="_blank" rel="noopener noreferrer">
        <Icon className={item.className} fontSize="large" />
      </a>
    </li> */
}
