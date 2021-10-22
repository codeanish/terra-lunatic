import { AxiosResponse } from 'axios';
import React, {useState} from 'react';
import TerraService from '../services/TerraService';
import IStakedLuna from '../types/Terra';
import { Button } from '@material-ui/core';

export interface Props{
    address: string;
}

const Card = (props: Props) => {

    const initialStakedLunaState = {
        ACCOUNT_ADDRESS: "",
        STAKED_LUNA: 0
    }

    const [stakedLuna, setStakedLuna] = useState<IStakedLuna>(initialStakedLunaState);
    const getStakedLuna = () => {
        TerraService.getAllStakedLuna()
            .then((response) => {
                const allStakedLuna = response.data
                const filteredStakedLuna = allStakedLuna.filter(staked => staked.ACCOUNT_ADDRESS == props.address)[0]
                setStakedLuna({
                    ACCOUNT_ADDRESS: filteredStakedLuna.ACCOUNT_ADDRESS,
                    STAKED_LUNA: filteredStakedLuna.STAKED_LUNA
                })
            })
            .catch(e => {
                console.log(e)
            })
    };

    return(
        <div>
            <h1>Terra Lunatic</h1>
            <h2>Address: {props.address}</h2>
            <Button variant="contained" onClick={getStakedLuna}>Click me</Button>
            <p>{stakedLuna.ACCOUNT_ADDRESS}</p>
            <p>{stakedLuna.STAKED_LUNA}</p>
        </div>
    )
}

export default Card;