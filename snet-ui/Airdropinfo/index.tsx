import { Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { AIRDROP_TITLE_STRING, AIRDROP_DESCRIPTION_STRING } from 'utils/airdropWindows';
import useStyles from './styles';

type Props = {
  blogLink?: string;
};

export default function Airdropinfo({ blogLink }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.airDropInfoContainer}>
      <Typography variant="h1">{AIRDROP_TITLE_STRING}</Typography>
      <Typography variant="h5">{AIRDROP_DESCRIPTION_STRING}</Typography>
      {blogLink ? (
        <Button
          variant="outlined"
          href={blogLink}
          target="_blank"
          rel="noreferrer noopener"
        >
          Read Whitepaper
        </Button>
      ) : null}
    </Box>
  );
}
