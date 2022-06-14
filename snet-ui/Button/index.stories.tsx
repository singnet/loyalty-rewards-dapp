import { Button } from "@mui/material";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { default as BlockchainWalletModal } from "../Blockchain/WalletModal";

export default {
  title: "Components/Button",
} as Meta;
export const Primary: React.VFC<{}> = () => <Button color="primary" variant="contained">Button</Button>;
export const Secondary: React.VFC<{}> = () => <Button color="secondary" variant="contained">Secondary</Button>;


export const WalletModal: React.VFC<{}> = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <BlockchainWalletModal open={open} setOpen={setOpen} />
    </div>
  );
};
