import React, { ReactNode } from 'react';
import "../styles/global.scss"
import styles from './layout.module.scss'
import Nav from './nav';

export interface Props{
    children: ReactNode,
    setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Layout = (props: Props) => {

    return(
        <div className={styles.container}>
            <Nav setAddress={props.setAddress}/>
            <div className={styles.contentWrapper}>
                {props.children}
            </div>
        </div>
    )
}
export default Layout;