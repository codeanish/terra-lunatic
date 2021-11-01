import React, { useState } from 'react';
import Layout from '../components/layout';
import styles from './notfound.module.scss';

const NotFoundPage = () => {
    const [address, setAddress] = useState("");
    return(
        <Layout setAddress={setAddress}>
            <div className={styles.container}>
                <div className={styles.heading}>
                    Oops!
                </div>
                <div className={styles.text}>
                    We can't seem to find the page you're looking for.
                </div>
            </div>
        </Layout>
    )
}

export default NotFoundPage