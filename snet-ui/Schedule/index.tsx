import React from 'react';
import Timeline from '@mui/lab/Timeline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ScheduleEvent from './ScheduleEvent';
import scheduleStyles from './styles';

type Event = {
  time: Date;
  title: string;
  description: string;
};

type Props = {
  title: string;
  events: Event[];
  blogLink?: string;
};

export default function Schedule({ title, events, blogLink }: Props) {
  const classes = scheduleStyles();
  return (
    <Box className={classes.scheduleContainer}>
      <Typography align="center" variant="h2">{title}</Typography>
      <Timeline className={classes.timeLineContainer}>
        {events.map((event, index) => (
          <ScheduleEvent key={event.time.toString()} event={event} nextEventTime={events[index + 1]?.time} />
        ))}
      </Timeline>
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
    </Box>
  );
}
