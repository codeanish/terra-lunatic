import { useState } from 'react';
import Card from '../components/card'
import Layout from '../components/layout';
import TerraClient from '../components/terra-client';
import styles from './score.module.scss';


const ScorePage = () => {

    const [address, setAddress] = useState("");
    return(
        <Layout setAddress={setAddress}>
          <div className={styles.container}>
            <Card address={address}/>
            <TerraClient address={address}/>
          </div>
      </Layout>
    )
}

export default ScorePage