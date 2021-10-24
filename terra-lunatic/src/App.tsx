import React, {useState} from 'react';
import styles from './App.module.scss';
import './components/card'
import Card from './components/card';
import { TextField } from '@material-ui/core';
import Layout from './components/layout';

function App() {

  const [walletAddress, setWAlletAddress] = useState("");

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Terra Lunatic</h1>
        <TextField
          className={styles.textInput}
          placeholder="Wallet Address" 
          value={walletAddress} 
          onChange={(e) =>setWAlletAddress(e.target.value)}/>
        <Card address={walletAddress}/>
      </div>
    </Layout>
  );
}

export default App;
