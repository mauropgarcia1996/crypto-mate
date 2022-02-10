import { Button, Grid, Input, Text, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { getAproxUSDMateValue } from "../utils/wallet";
interface MainPanelProps {
  handleTransaction: (address: string, amount: string, message: string) => void
}
const MainPanel = ({ handleTransaction }: MainPanelProps) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('1');
  const [message, setMessage] = useState('');
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}><Input clearable width="100%" label="Address" placeholder="address" status='primary' value={address} onChange={(e) => setAddress(e.target.value)} /></Grid>
      <Grid xs={12}>
        <Input min='1' width="100%" label="Amount" type='number' placeholder="amount" status='primary' value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Grid>
      <Grid xs={12}><Textarea width="100%" label="Message" placeholder="message" status='primary' value={message} onChange={(e) => setMessage(e.target.value)} /></Grid>
      <Grid xs={12}>
        <Text weight='bold' small>Note: you are paying {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount ? getAproxUSDMateValue(amount) : 0)}</Text>
        <div style={{ width: "100%", display: 'flex', justifyContent: "end" }}>
          <Button size='sm' onClick={() => handleTransaction(address, amount, message)}>Send</Button>
        </div>
      </Grid>
    </Grid.Container>
  )
};

export default MainPanel