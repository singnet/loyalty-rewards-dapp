import React from "react";
import { storiesOf } from "@storybook/react";
import withLiveEditScope from "storybook-addon-react-live-edit/dist/withLiveEditScope";

import SNETButton from ".";

storiesOf("Form|SNETButton", module)
  .addParameters({ props: { propTables: [SNETButton] } })
  .addDecorator(withLiveEditScope({ React, SNETButton }))
  .addLiveSource(
    "live source",
    `return <SNETButton color="primary" variant="contained" children="Try changing props"/>`
  );
