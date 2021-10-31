import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Card from '../components/card'
import Layout from '../components/layout';
import styles from './score.module.scss';

const ScorePage = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [dialogAddress, setDialogAddress] = useState("")
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [buttonText, setButtonText] = useState("CONNECT");
  
    const handleClick = () => {
      if(isConnected){
        setWalletAddress("");
        setButtonText("CONNECT");
        setIsConnected(false);
      } else {
        setOpen(true);
      }
    }
  
    const updateWalletAddress = () => {
      setWalletAddress(dialogAddress);
      setButtonText(dialogAddress);
      setIsConnected(true);
      handleClose();
    }

    return(
        <Layout>
        <div className={styles.container}>
          <Modal 
            open={open}
            onClose={handleClose}>
              <Box
                sx = {{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  View an Address
                </Typography>
                <TextField
                  className={styles.textInput}
                  placeholder="ADDRESS" 
                  value={dialogAddress} 
                  onChange={(e) =>setDialogAddress(e.target.value)}/>
                <Button onClick={updateWalletAddress}>
                  View
                </Button>
              </Box>
          </Modal>
          <h1>Terra Lunatic</h1>
          <Button onClick={handleClick}>
            {buttonText}
          </Button>
          <Card address={walletAddress}/>
        </div>
      </Layout>
    )
}

export default ScorePage