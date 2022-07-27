import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TRANSACTION_TYPE } from 'utils/airdropWindows';
import { Link } from '@mui/material';

type HistoryEvent = {
  window: string;
  reward: string;
  status: string;
  action_type: string;
  txn_hash: string;
};

type HistoryProps = {
  events: HistoryEvent[];
};
export default function History({ events }: HistoryProps) {
  const CardanoTransaction = process.env.NEXT_PUBLIC_CARDANO_TRANSACTION_DETAIL;
  return (
    <List sx={{ py: 0.5 }}>
      {events.map((event) => (
        <ListItem key={event.window} sx={{ mb: '1px', py: 0, px: 0, justifyContent: 'center' }}>
          <Grid container xs={9} sx={{ bgcolor: 'bgHighlight.main', borderRadius: '2px', px: 3, py: 2 }}>
            <Grid item xs={5}>
              <Typography color="primary.main" fontSize={12}>
                Claim
              </Typography>
              <Typography color="textAdvanced.dark" fontFamily="MuliSemiBold" fontSize={14} lineHeight="24px">
                {event.window}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary.main" fontSize={12}>
                Reward
              </Typography>
              {event.action_type === TRANSACTION_TYPE.ADA_TRANSFER ? (
                <Typography color="textAdvanced.dark" fontFamily="MuliSemiBold" fontSize={14} lineHeight="24px">
                  {event.reward}
                </Typography>
              ) : (
                <Link
                  component="a"
                  href={`${CardanoTransaction}/${event.txn_hash}`}
                  underline="hover"
                  target="_blank"
                  color="Highlight"
                >
                  <Typography color="textAdvanced.dark" fontFamily="MuliSemiBold" fontSize={14} lineHeight="24px">
                    {event.reward}
                  </Typography>
                </Link>
              )}
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary.main" fontSize={12}>
                Status
              </Typography>
              <Typography color="textAdvanced.dark" fontFamily="MuliSemiBold" fontSize={14} lineHeight="24px">
                {event.status}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
