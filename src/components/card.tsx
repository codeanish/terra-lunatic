import { MsgExecuteContract, MsgVote } from '@terra-money/terra.js';
import React, {useState, useEffect} from 'react';
import TerraService from '../services/TerraService';
import { ChallengeScore, ExecuteSend } from '../shared/types';
import styles from './card.module.scss'
import Challenges from './challenges';
import Share from './share';
import terraIcon from '../assets/icons/terra.svg'
import pylonIcon from '../assets/icons/pylon.svg'
import anchorIcon from '../assets/icons/anchor.svg'

export interface Props{
    address: string;
}

const Card = (props: Props) => {
    const initialStakedDelegation = {name: "Staked Luna", description: "Staked Luna", score: 50, complete: false, url: "https://station.terra.money/staking", image: terraIcon}
    const initialAnchorBorrowing = {name: "Anchor Borrowing", description: "Borrowing UST from Anchor", score: 30, complete: false, url: "https://app.anchorprotocol.com/borrow", image: anchorIcon}
    const initialAnchorDeposits = {name: "Anchor Deposits", description: "Deposit UST in Anchor", score: 30, complete: false, url: "https://app.anchorprotocol.com/earn", image: anchorIcon}
    const initialAncStaked = {name: "ANC Staked", description: "Staked ANC in Anchor", score: 30, complete: false, url: "https://app.anchorprotocol.com/anc-governance/stake", image: anchorIcon}
    const initialPylonMineUSTDepoist = {name: "Pylon MINE UST", description: "Add liquidity to MINE-UST in Pylon", score: 30, complete: false, url: "https://app.pylon.money/liquidity/pool/provide", image: pylonIcon}
    const initialGovernanceVotes = {name: "Governance Votes", description: "Voted on a Governance Proposal", score: 20, complete: false, url: "https://station.terra.money/governance?status=2", image: terraIcon}
    const [stakedLuna, setStakedLuna] = useState<ChallengeScore>(initialStakedDelegation);
    const [anchorBorrowing, setAnchorBorrowing] = useState<ChallengeScore>(initialAnchorBorrowing);
    const [anchorDeposit, setAnchorDeposit] = useState<ChallengeScore>(initialAnchorDeposits);
    const [pylonMineUst, setPylonMineUst] = useState<ChallengeScore>(initialPylonMineUSTDepoist);
    const [governanceProposal, setGovernanceProposal] = useState<ChallengeScore>(initialGovernanceVotes);
    const [ancStaked, setAncStaked] = useState<ChallengeScore>(initialAncStaked);

    useEffect(() => {
        if(props.address !== ""){
            fetchStakedLuna();
            fetchTransactions()
        }
        else{
            setInitialState()
        }
    }, [props.address])

    const setInitialState = () => {
        setStakedLuna(initialStakedDelegation)
        setAnchorBorrowing(initialAnchorBorrowing)
        setAnchorDeposit(initialAnchorDeposits)
        setGovernanceProposal(initialGovernanceVotes)
        setPylonMineUst(initialPylonMineUSTDepoist)
        setAncStaked(initialAncStaked);
    }

    const allCategories = () => {
        return [stakedLuna, anchorBorrowing, anchorDeposit, ancStaked, pylonMineUst, governanceProposal]
    }

    const fetchStakedLuna = () => {
        TerraService.getStakedDelegations(props.address)
        .then((response) => {
            if(response.length > 0){
                setStakedLuna({...initialStakedDelegation, complete: true});
            }
        })
    }


    const fetchTransactions = () => {
        const anchorContract = 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s'
        const ancTokenContract = 'terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76'
        const anchorGovernanceContract = 'terra1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5'
        const pylonMineUSTContract = 'terra178jydtjvj4gw8earkgnqc80c3hrmqj4kw2welz'
        TerraService.getTotalTransactions(props.address).then(a => {
            if(a.total_count === 0){
                return false;
            }
            const limit = 5;
            let pages = Math.floor(a.total_count/limit) + 1
            
            for(let page = 1; page <= pages; page++){
                TerraService.getTransactions(props.address, limit, page).then(b => {
                    for(let x = 0; x < b.count; x++){
                        for (let y = 0; y < b.txs[x].tx.msg.length; y++){
                            if(b.txs[x].tx.msg[y] instanceof MsgVote){
                                setGovernanceProposal({...initialGovernanceVotes, complete: true})
                            }
                            if(b.txs[x].tx.msg[y] instanceof MsgExecuteContract){
                                let contract = b.txs[x].tx.msg[y] as MsgExecuteContract;
                                if(contract.contract === anchorContract &&  'deposit_stable' in contract.execute_msg){
                                    setAnchorDeposit({...initialAnchorDeposits, complete: true});
                                }
                                if(contract.contract === anchorContract &&  'borrow_stable' in contract.execute_msg){
                                    setAnchorBorrowing({...initialAnchorBorrowing, complete: true});
                                }
                                if(contract.contract === ancTokenContract && 'send' in contract.execute_msg){
                                    let send = contract.execute_msg as ExecuteSend
                                    if(send.send.contract === anchorGovernanceContract){
                                        setAncStaked({...initialAncStaked, complete: true})
                                    }
                                }
                                if(contract.contract === pylonMineUSTContract && 'provide_liquidity' in contract.execute_msg){
                                    setPylonMineUst({...initialPylonMineUSTDepoist, complete: true});
                                }
                            }
                        }
                    }
                })
            }
        })
    }

    const sum = (a: number, b: number): number => {
        return a + b
    }

    const totalAvailableScore = () => {
        return allCategories().map(item => item.score).reduce(sum)
        
    }

    const myTotalScore = () => {
        return allCategories().map(item => {
            if(item.complete === true)
            {return item.score} else return 0 }).reduce(sum)
    }

    function lunaticDescription(lunaticScore: number): string{
        if(lunaticScore <= 0) {return "I should live a little"} else
        if(lunaticScore <0.1) {return "I'm a bit loopy"} else
        if(lunaticScore <0.2) {return "Some might say I'm cuckoo"} else
        if(lunaticScore <0.3) {return "I've got a bit of a screw loose"} else
        if(lunaticScore <0.4) {return "I'm a Madman"} else
        if(lunaticScore <0.5) {return "I'm one card short of a full deck"} else
        if(lunaticScore <0.6) {return "I'm a Maniac"} else
        if(lunaticScore <0.8) {return "Can someone smell cheese?"} else
        return "I'm a total lunatic!"
    }

    return(
        <div className={styles.container}>
            <h2>How much of a lunatic are you?</h2>
            <div className={styles.row}><div className={styles.bigNumber}>{myTotalScore()}</div><div className={styles.smallNumber}>/{totalAvailableScore()}</div></div>
            {myTotalScore() > 0 ? <p>{lunaticDescription((myTotalScore()/totalAvailableScore()))}</p> : null}
            <Challenges scores={allCategories()}/>
            {myTotalScore() > 0 ? <Share myScore={myTotalScore()} totalAvailableScore={totalAvailableScore()} description={lunaticDescription(myTotalScore()/totalAvailableScore())} /> : <br/>}
        </div>
    )
}

export default Card;