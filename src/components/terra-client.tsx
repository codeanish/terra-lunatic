import React, { useEffect, useState } from 'react';
import TerraService from "../services/TerraService";

export interface Props{
    address: string
}

const TerraClient = (props: Props) => {

    const [hasAnchorBorrowing, setAnchorBorrowing] = useState(false)

    useEffect(() => {
        if (props.address !== ""){
            runQueries()
        } else {
            resetState()
        }
    }, [props.address, hasAnchorBorrowing])

    const resetState = () => {
        setAnchorBorrowing(false);
    }

    const runQueries = () => {
        TerraService.getAnchorBorrowing(props.address).then(a => {
            if(a.loan_amount >0){
                console.log(a.loan_amount);
                setAnchorBorrowing(true);
            }else {
                console.log(a.loan_amount);
                setAnchorBorrowing(false);
            }
        });
    }

    return (
        <div>{hasAnchorBorrowing ? "Yes" : "No"}</div>
    )
}

export default TerraClient;