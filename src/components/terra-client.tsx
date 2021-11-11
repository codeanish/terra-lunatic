import { Coin, LCDClient } from "@terra-money/terra.js";
import React from 'react';

export interface Props{
    address: string
}

const TerraClient = (props: Props) => {
    const terra = new LCDClient({
        URL: 'https://lcd.terra.dev',
        chainID: 'columbus-5'
    });

    const contractAddress = 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s';
    const myAddress = 'terra1pkwhhh5rt740sdvpq7rkc36s9zavr52p9ld826';

    const offerCoin = new Coin('uusd', '1000000');
    terra.staking.delegations(myAddress).then(delegations => {
        for(let i = 0; i < delegations.length; i++){
            console.log(delegations[0].balance.denom)
        }
    });
    
    terra.wasm.contractQuery(
        contractAddress, 
        {borrower_info: {
            borrower: myAddress,
          }}).then(a => {
        console.log(a);
    });
    // terra.market.swapRate(offerCoin, 'ukrw').then(c => {
    //     console.log(`${offerCoin.toString()} can be swapped for ${c.toString()}`);
    //   });

    return (
        <div></div>
    )
}

export default TerraClient;