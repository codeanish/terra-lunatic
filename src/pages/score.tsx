import { useState, useEffect } from 'react';
import Card from '../components/card'
import Layout from '../components/layout';
import styles from './score.module.scss';
import ReactGA from 'react-ga';

ReactGA.pageview('/score');

const ScorePage = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  })

    const [address, setAddress] = useState("");
    return(
        <Layout setAddress={setAddress}>
          <div className={styles.container}>
            <Card address={address}/>
          </div>
      </Layout>
    )
}

export default ScorePage