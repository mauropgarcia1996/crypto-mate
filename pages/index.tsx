import { Container, Grid, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import LoginPanel from '../containers/LoginPanel';
import MainPanel from '../containers/MainPanel';
import { useWalletStore } from "../stores/walletStore";
import { isConnected, isMetamaskInstalled, sendTransaction } from '../utils/wallet';

/**
 * Provisory fix
 */
declare global {
  interface Window {
    ethereum: any;
  }
}

const Home: NextPage = () => {
  const { wallet, setWallet } = useWalletStore()

  useEffect(() => {
    isMetamaskInstalled() && addEventListener()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isMetamaskInstalled() && checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])



  const addEventListener = () => {
    window.ethereum.on('accountsChanged', function (accounts: any) {
      setWallet(accounts[0])
    })
  }

  const checkConnection = async () => {
    const connection = await isConnected();
    setWallet(connection ? connection[0] : connection)
  };

  const handleTransaction = async (address: string, amount: string, message: string) => {
    const tx = await sendTransaction(address, amount);
    if (tx.code === -32602 || tx.message === -32603) {
      alert(tx.message);
    }
  };

  return (
    <div className='h-100'>
      <Grid.Container className='h-100'>
        <Grid style={{ background: "#0070F3" }} xs={0} sm={6}></Grid>
        <Grid xs={12} sm={6}>
          <Container style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: 'center', width: '100%' }}>
            <Text
              h1
              css={{
                textGradient: '45deg, $blue500 -20%, $pink500 50%',
              }}
              weight='bold'
            >
              crypto-mate
            </Text>
            <Text h4 weight='semibold'>You can send a mate to anyone using Binance Smart Chain!</Text>
            {wallet ? <MainPanel handleTransaction={handleTransaction} /> : <LoginPanel />}
          </Container>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Home;
