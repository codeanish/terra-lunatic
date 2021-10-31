import React, { useState } from 'react';
import Layout from '../components/layout';

const NotFoundPage = () => {
    const [address, setAddress] = useState("");
    return(
        <Layout setAddress={setAddress}>
            <div>
                Not Found Page
            </div>
        </Layout>
    )
}

export default NotFoundPage