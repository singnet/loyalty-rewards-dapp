import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type HistoryEvent = {
  window: string;
  reward: string;
  status: string;
};

type HistoryProps = {
  events: HistoryEvent[];
};
export default function History({ events }: HistoryProps) {
  return (
    <List sx={{ py: 0.5 }}>
      {events.map((event) => (
        <ListItem key={event.window} sx={{ mb: '1px', py: 0, px: 0, justifyContent: 'center' }}>
          <Grid container xs={9} sx={{ bgcolor: 'bgHighlight.main', borderRadius: '2px', px: 3, py: 2 }}>
            <Grid item xs={5}>
              <Typography color="primary.main" fontSize={12}>
                Claim
              </Typography>
              <Typography color="textAdvanced.dark" fontSize={14} fontWeight={600}>
                {event.window}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary.main" fontSize={12}>
                Reward
              </Typography>
              <Typography color="textAdvanced.dark" fontSize={14}>
                {event.reward}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary.main" fontSize={12}>
                Status
              </Typography>
              <Typography color="textAdvanced.dark" fontSize={14}>
                {event.status}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
