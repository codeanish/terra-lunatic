import React from 'react';
import "../styles/global.scss"
import styles from './layout.module.scss'

const Layout : React.FC = ({children}) => {
    return(
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                {children}
            </div>
        </div>
    )
}
export default Layout;