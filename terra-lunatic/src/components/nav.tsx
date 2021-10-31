import React from "react";
import { NavLink } from "react-router-dom";
import styles from './nav.module.scss';

const Nav = () => {
    return(
        <nav className={styles.nav}>
            <ul className={styles.navItems}>
                <li className={styles.navItem}><NavLink to="/">Score</NavLink></li>
                <li className={styles.navItem}><NavLink to="/asylum">Asylum</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav;