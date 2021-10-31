import React, {useState, useEffect} from 'react';
import TerraService from '../services/TerraService';

import styles from './card.module.scss'
import LinearValueIndicator from './linear-value-indicator';

export interface Props{
    address: string;
}

const Card = (props: Props) => {

    useEffect(() => {
        if(props.address !== ""){
            runQueries();
            setShowResults(true);
        }
        else{
            setStakedLuna(0);
            setDepositedUST(0);
            setGovernanceVotes(0);
            setDepositeduLP(0);
            setShowResults(false);
        }
    })

    const runQueries = () => {
        getStakedLuna()
        getGovernanceVotes()
        getDepositedUST()
        getDepositeduLP()
    }

    const initialStakedLunaState = 0

    const initialGovernanceVotesState = 0

    const initialDepositedUSTState = 0

    const initialuLPState = 0

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

    const [depositeduLP, setDepositeduLP] = useState<number>(initialuLPState);
    const getDepositeduLP = () => {
        TerraService.getuLPDepositsToPylon(props.address)
            .then((response) => {
                const ulpDeposits = response.data
                setDepositeduLP(ulpDeposits * (10 ** -6))
            })
            .catch(e => {
                console.log(e)
            })
    }

    function calculateUstBasedScore(ust: number): number {
        console.log(ust)
        if(ust <= 0) {return 0} else
        if(ust < 10) {return 0.1} else
        if(ust < 50) {return 0.2} else
        if(ust < 100) {return 0.3} else
        if(ust < 500) {return 0.4} else
        if(ust < 1000) {return 0.5} else
        if(ust < 5000) {return 0.6} else
        if(ust < 10000) {return 0.7} else
        if(ust < 50000) {return 0.8} else
        if(ust < 100000) {return 0.9} else
        return 1.0
    }

    function calculateGovernanceScore(votes: number): number {
        const topScoreVotesLimit = 20
        return Math.min(votes / topScoreVotesLimit, 1.0)
    }

    function calculateLunaticScore(stakedLuna: number, governanceVotes: number, anchorDeposit: number, depositeduLP: number):number {
        const lunaToUstApproxFX = 42
        const ulpToUstApproxFX = 150
        const anchorScore = calculateUstBasedScore(anchorDeposit);
        const stakedLunaScore = calculateUstBasedScore(stakedLuna * lunaToUstApproxFX)
        const ulpScore = calculateUstBasedScore(depositeduLP * ulpToUstApproxFX)
        const governanceScore = calculateGovernanceScore(governanceVotes)
        const lunaticScore = stakedLunaScore * 0.5 + governanceScore * 0.3 + anchorScore * 0.1 + ulpScore * 0.1 
        return lunaticScore
    }

    function lunaticDescription(lunaticScore: number): string{
        if(lunaticScore <= 0) {return "You should live a little"} else
        if(lunaticScore <0.1) {return "You're a bit loopy"} else
        if(lunaticScore <0.2) {return "Some might say you're cuckoo"} else
        if(lunaticScore <0.3) {return "You've got a bit of a screw loose"} else
        if(lunaticScore <0.4) {return "You madman"} else
        if(lunaticScore <0.5) {return "You're one card short of a full deck"} else
        if(lunaticScore <0.6) {return "Maniac"} else
        if(lunaticScore <0.8) {return "Can someone smell cheese?"} else
        return "You're a total lunatic!"
    }

    const [showResults, setShowResults] = useState<boolean>(false)

    return(
        <div className={styles.container}>
            {showResults ? <div><LinearValueIndicator value={calculateLunaticScore(stakedLuna, governanceVotes, depositedUST, depositeduLP) * 100}/>
            <h2>{lunaticDescription(calculateLunaticScore(stakedLuna, governanceVotes, depositedUST, depositeduLP))}</h2><br/><br/></div> : <br/> }
            <p>Staked Luna: {stakedLuna}</p>
            <p>Governance Votes: {governanceVotes}</p>
            <p>Deposited UST in Anchor: {depositedUST}</p>
            <p>Deposited uLP in Pylon Pool: {depositeduLP}</p>
        </div>
    )
}

export default Card;