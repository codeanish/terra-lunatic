import React, {useState} from 'react';
import TerraService from '../services/TerraService';
import { Button } from '@material-ui/core';

export interface Props{
    address: string;
}

const Card = (props: Props) => {

    const initialStakedLunaState = 0

    const initialGovernanceVotesState = 0

    const initialDepositedUSTState = 0

    const [stakedLuna, setStakedLuna] = useState<number>(initialStakedLunaState);
    const getStakedLuna = () => {
        TerraService.getStakedLuna(props.address)
            .then((response) => {
                const stakedLuna = response.data
                setStakedLuna(stakedLuna)
            })
            .catch(e => {
                console.log(e)
            })
    };

    const [governanceVotes, setGovernanceVotes] = useState<number>(initialGovernanceVotesState);
    const getGovernanceVotes = () => {
        TerraService.getGovernanceVotes(props.address)
            .then((response) => {
                const governanceVotes = response.data
                setGovernanceVotes(governanceVotes)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const [depositedUST, setDepositedUST] = useState<number>(initialDepositedUSTState);
    const getDepositedUST = () => {
        TerraService.getUstDepositsToAnchor(props.address)
            .then((response) => {
                const ustDeposits = response.data
                setDepositedUST(ustDeposits * (10 ** -6))
            })
            .catch(e => {
                console.log(e)
            })
    }

    function calculateLunaBasedScore(luna: number): number {
        if(luna > 0 && luna <= 1){
            return 1;
        }
        if(luna > 1 && luna <= 10){
            return 2;
        }
        if(luna > 10 && luna <= 100){
            return 3;
        }
        if(luna > 100 && luna <= 1000){
            return 4
        }
        if(luna > 1000 && luna <= 10000){
            return 5
        }
        if(luna > 10000 && luna <= 100000){
            return 6
        }
        if(luna > 100000 && luna <= 1000000){
            return 7
        }
        if(luna > 1000000){
            return 8
        }
        return 0
    }

    const runQueries = () => {
        getStakedLuna()
        getGovernanceVotes()
        getDepositedUST()
    }

    return(
        <div>
            <h1>Terra Lunatic</h1>
            <h2>Address: {props.address}</h2>
            <Button variant="contained" onClick={runQueries}>Click me</Button>
            <p>Staked Luna: {stakedLuna}</p>
            <p>Staked Luna Score: {calculateLunaBasedScore(stakedLuna)} </p>
            <p>Governance Votes: {governanceVotes}</p>
            <p>Deposited UST: {depositedUST}</p>
            <p>Deposited UST Score: {calculateLunaBasedScore(depositedUST / 40)} </p>
            <p>Total Score: {calculateLunaBasedScore(stakedLuna) + calculateLunaBasedScore(depositedUST / 40) + governanceVotes}</p>
        </div>
    )
}

export default Card;