import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { checkDateIsBetween, getDateInStandardFormat } from 'utils/date';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { Container } from '@mui/material';
import scheduleStyles from './styles';

type Event = {
  time: Date;
  title: string;
  description: string;
};

type ScheduleEventProps = {
  event: Event;
  nextEventTime?: Date;
};

const now = moment.utc(new Date());

export default function ScheduleEvent({ event, nextEventTime }: ScheduleEventProps) {
  const isActiveEvent = nextEventTime && checkDateIsBetween(moment.utc(event?.time), moment.utc(nextEventTime), now);
  const nextEvent = () => nextEventTime;
  const formattedDate = getDateInStandardFormat(event.time);
  const classes = scheduleStyles();
  return (
    <Container>
      <TimelineItem key={event.id}>
        <TimelineOppositeContent sx={{ display: 'none' }} />
        <TimelineSeparator className={classes.timeLineSepator}>
          <TimelineDot />
          {nextEventTime ? (
            <TimelineConnector sx={{ height: 100 }}>
              {isActiveEvent ? (
                <Typography variant="body2">
                  Upcoming<span></span>
                </Typography>
              ) : null}
            </TimelineConnector>
          ) : null}
        </TimelineSeparator>
        <TimelineContent>
          <Grid container className={classes.scheduleContent}>
            <Grid item xs={4} className={classes.scheduleTime}>
              {isActiveEvent ? (
                <Typography variant="h6">{formattedDate}</Typography>
              ) : (
                <Typography variant="h6">{formattedDate}</Typography>
              )}
            </Grid>
            <Grid item xs={8} className={classes.scheduleDetails}>
              {isActiveEvent ? (
                <Typography variant="normal">{event.title}</Typography>
              ) : (
                <Typography variant="normal">{event.title}</Typography>
              )}
              <Typography component="p">{event.description}</Typography>
            </Grid>
          </Grid>
        </TimelineContent>
      </TimelineItem>
    </Container>
  );
}
