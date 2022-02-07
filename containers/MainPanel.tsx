import { Button, Grid, Input, Text, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { getAproxUSDMateValue } from "../utils/wallet";

const MainPanel = ({ handleTransaction }) => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('1');
  const [message, setMessage] = useState('');
  return (
    <Grid.Container gap={2}>
      <Grid xs={12}><Input clearable width="100%" label="Address" placeholder="address" status='primary' value={address} onChange={(e) => setAddress(e.target.value)} /></Grid>
      <Grid xs={12}>
        <Input min='1' width="75%" label="Amount" type='number' placeholder="amount" status='primary' value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '25%' }}>
          <Text weight='bold'>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getAproxUSDMateValue(amount))}</Text>
        </div>
      </Grid>
      <Grid xs={12}><Textarea width="100%" label="Message" placeholder="message" status='primary' value={message} onChange={(e) => setMessage(e.target.value)} /></Grid>
      <Grid xs={12}><Button size='sm' onClick={() => handleTransaction(address, amount, message)}>Send</Button></Grid>
    </Grid.Container>
  )
};

export default MainPanel