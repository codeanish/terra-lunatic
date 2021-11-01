import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './nav.module.scss';

export interface Props {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = (props: Props) => {

    const [isConnected, setIsConnected] = useState(false);
    const [dialogAddress, setDialogAddress] = useState("")
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [buttonText, setButtonText] = useState("CONNECT");
  
    const handleClick = () => {
      if(isConnected){
        setButtonText("CONNECT");
        setIsConnected(false);
        props.setAddress("");
      } else {
        setOpen(true);
      }
    }
  
    const updateWalletAddress = () => {
      setButtonText(dialogAddress.substr(0,3) + '...' + dialogAddress.slice(-3));
      setIsConnected(true);
      props.setAddress(dialogAddress)
      handleClose();
    }

    return(
        <nav className={styles.nav}>
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
            <div className={styles.logo}>
                <NavLink to="/">Terra Lunatic</NavLink>
            </div>
            <ul className={styles.navItems}>
                <li className={styles.navItem}><NavLink to="/">Score</NavLink></li>
                {/* <li className={styles.navItem}><NavLink to="/asylum">Asylum</NavLink></li> */}
                <li className={styles.navItem}>
                    <Button style={{maxWidth: '120px', minWidth: '120px'}} size="large" variant="contained" onClick={handleClick}>{buttonText}</Button>
                </li>
            </ul>
            
        </nav>
    )
}

export default Nav;