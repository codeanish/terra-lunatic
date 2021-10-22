import React, {useState} from 'react';
import './App.css';
import './components/card'
import Card from './components/card';
import { TextField } from '@material-ui/core';

function App() {

  const [walletAddress, setWAlletAddress] = useState("");

  return (
    <div>
      <TextField 
        placeholder="Wallet Address" 
        value={walletAddress} 
        onChange={(e) =>setWAlletAddress(e.target.value)}/>
      <Card address={walletAddress}/>
    </div>
  );
}

export default App;
