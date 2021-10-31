import { Check, ScoreOutlined } from '@mui/icons-material';
import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import React from 'react';
import { ChallengeScore } from '../shared/types';

export interface Props{
    scores: ChallengeScore[]
}

const Challenges = (props: Props) => {
    console.log(props)
    return (
        <List>
            {props.scores.map(score => (<ListItem><ListItemText primary={score.name}/>{score.complete ? <Chip label={score.score} avatar={<Avatar><Check/></Avatar>}/> : <Chip label={score.score}/>}</ListItem>))}
        </List>
    )
}

export default Challenges;