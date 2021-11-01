import React, { useState } from 'react';
import Layout from '../components/layout';

const LunaticAsylum = () => {
    const [address, setAddress] = useState("");
    return(
        <Layout setAddress={setAddress}>
            <div>
                LunaticAsylum
            </div>
        </Layout>
    )
}

export default LunaticAsylum