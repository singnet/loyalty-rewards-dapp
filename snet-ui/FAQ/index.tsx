import AddSharpIcon from "@mui/icons-material/AddSharp";
import { Button } from "@mui/material";
import { faqSampleData } from "./faq";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Box } from "@mui/system";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { forwardRef } from "react";
import useStyles from './styles';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  borderTop: 0,
  borderRight: 0,
  borderLeft: 0,
});

function FAQPage(_,ref) {
  const classes = useStyles();
  return (
    <Box className={classes.faqContainer} ref={ref}>
      <Typography align="center" variant="h2">
        Frequently Asked Questions
      </Typography>
      <Box className={classes.accordionContainer}>
        {faqSampleData.map((faq) => (
          <Accordion key={faq.question}>
            <AccordionSummary
              expandIcon={<AddSharpIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box className={classes.btnContainer}>
        <Typography>Still Have Questions?</Typography>
        <Button
          variant="outlined"
          size="large"
          href="/contactus"
        >
          <Typography color="secondary.main" variant="subtitle2">
            Contact us
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
export default forwardRef(FAQPage);
