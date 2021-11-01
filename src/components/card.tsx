import React, {useState, useEffect} from 'react';
import TerraService from '../services/TerraService';
import { ChallengeScore } from '../shared/types';
import styles from './card.module.scss'
import Challenges from './challenges';
import LinearValueIndicator from './linear-value-indicator';
import Share from './share';

export interface Props{
    address: string;
}

const Card = (props: Props) => {

    const [totalScore, setTotalScore] = useState(0);
    const [totalAvailableScore, setTotalAvailableScore] = useState(0);
    useEffect(() => {
        if(props.address !== ""){
            getScores();
        }
        else{
            getCategories()
            setTotalScore(0)
        }
    }, [props.address, totalScore])

    const initialChallengeScore: ChallengeScore[] = [];

    const [myScores, setMyScores] = useState<ChallengeScore[]>(initialChallengeScore);
    
    const getScores = () => {
        TerraService.getChallengeScores(props.address)
        .then((response) => {
            const scores = response.data
            setMyScores(scores)
            myTotalScore(scores)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const getCategories = () => {
        TerraService.getChallengeCateogies()
        .then((response) => {
            const categories = response.data
            setMyScores(categories)
            totalAvailableScores(categories)
        })
        .catch(e => {
            console.log(e)
        })
    }

    const sum = (a: number, b: number): number => {
        return a + b
    }

    const totalAvailableScores = (scores: ChallengeScore[]) => {
        setTotalAvailableScore(scores.map(item => item.score).reduce(sum));
    }

    const myTotalScore = (scores: ChallengeScore[]) => {
        const score = scores.map(item => {
            if(item.complete === true)
            {return item.score} else return 0 }).reduce(sum)
        setTotalScore(score);
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
            <h1>How much of a lunatic are you?</h1>
            <div className={styles.row}><div className={styles.bigNumber}>{totalScore}</div><div className={styles.smallNumber}>/{totalAvailableScore}</div></div>
            <LinearValueIndicator value={(totalScore/totalAvailableScore) * 100}/>
            <br/>
            <h2>{lunaticDescription((totalScore/totalAvailableScore))}</h2>
            <br/>
            <Challenges scores={myScores}/>
            {totalScore > 0 ? <Share myScore={totalScore} totalAvailableScore={totalAvailableScore} description={lunaticDescription(totalScore/totalAvailableScore)} /> : <br/>}
        </div>
    )
}

export default Card;