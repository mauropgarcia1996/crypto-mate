import { Container, Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import LoginPanel from '../containers/LoginPanel';
import MainPanel from '../containers/MainPanel';
import { useWalletStore } from "../stores/walletStore";
import { isConnected, sendTransaction } from '../utils/wallet';

const Home: NextPage = () => {
  const { wallet, setWallet } = useWalletStore()

  useEffect(() => {
    addEventListener()
  }, []);

  useEffect(() => {
    checkConnection();
  }, [wallet])

  const addEventListener = () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    })
  }

  const checkConnection = async () => {
    const connection = await isConnected();
    setWallet(connection[0])
  };

  const handleTransaction = async (address: string, amount: string, message: string) => {
    const tx = await sendTransaction(address, amount);
    if (tx.code === -32602 || tx.message === -32603) {
      alert(tx.message);
    }
  };

  return (
    <Container>
      <div>
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
      </div>
    </Container>
  );
};

export default Home;
