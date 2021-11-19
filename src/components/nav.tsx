import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './nav.module.scss';
import TerraLogo from '../assets/terra_logo.svg'

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
              <Box className={styles.modalBox}>
                <div className={styles.modalContainer}>
                  <div className={styles.heading}>
                    View an Address
                  </div>
                  <input
                    className={styles.textInput}
                    placeholder="terrapsj..." 
                    value={dialogAddress} 
                    onChange={(e) =>setDialogAddress(e.target.value)}/>
                  <Button className={styles.viewButton} onClick={updateWalletAddress}>
                    View
                  </Button>
                </div>
              </Box>
          </Modal>
            <div className={styles.logo}>
                <NavLink to="/"><img src={TerraLogo} alt="Terra"/></NavLink>
            </div>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>
                    <Button className={styles.walletButton} size="large" variant="contained" onClick={handleClick}>{buttonText}</Button>
                </li>
            </ul>
            
        </nav>
    )
}

export default Nav;