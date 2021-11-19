import { Check } from '@mui/icons-material';
import { Avatar, Chip, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { ChallengeScore } from '../shared/types';
import styles from './challenges.module.scss';


export interface Props{
    scores: ChallengeScore[]
}

const Challenges = (props: Props) => {
    return (
        <List>
            {props.scores.map(score => (
                <a href={score.url} target="_blank" rel="noreferrer">
                    <ListItem key={score.name} className={styles.item}>
                        <img src={score.image} className={styles.icon} alt={score.name}/>
                        <ListItemText primary={score.description}/>
                        {score.complete ? <Chip sx={{bgcolor: "#D8DEE9"}} label={score.score} avatar={<Avatar><Check/></Avatar>}/> : <Chip sx={{bgcolor: "#D8DEE9"}} label={score.score}/>}
                    </ListItem>
                </a>))}
        </List>
    )
}

export default Challenges;