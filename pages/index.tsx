import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { connectToBSC, addAccountChangeEvent, isConnected, sendTransaction } from '../utils/wallet'

const Home: NextPage = () => {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState('')
  useEffect(() => {
    addAccountChangeEvent()
    checkConnection()
  }, [])
  const handleConnection = () => {
    connectToBSC()
  };

  const checkConnection = async () => {
    const connection = await isConnected()
    setConnected(connection)
  }

  const handleTransaction = async () => {
    const tx = await sendTransaction(address)
    if (tx.code === -32602 || tx.message === -32603) {
      alert(tx.message)
    }
  };


  return (
    <div>
      <h1>Welcome to crypto-mate</h1>
      {
        connected
          ? <button onClick={handleTransaction}>Send Transaction</button>
          : <button onClick={handleConnection}>Connect to MetaMask</button>
      }
      <input 
        placeholder="address where to send" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} />
    </div>
  )
}

export default Home
