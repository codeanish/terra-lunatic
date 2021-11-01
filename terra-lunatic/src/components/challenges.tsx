import { Check } from '@mui/icons-material';
import { Avatar, Chip, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { ChallengeScore } from '../shared/types';

export interface Props{
    scores: ChallengeScore[]
}

const Challenges = (props: Props) => {
    return (
        <List>
            {props.scores.map(score => (<ListItem key={score.name} disablePadding><ListItemText primary={score.description}/>{score.complete ? <Chip sx={{bgcolor: "#D8DEE9"}} label={score.score} avatar={<Avatar><Check/></Avatar>}/> : <Chip sx={{bgcolor: "#D8DEE9"}} label={score.score}/>}</ListItem>))}
        </List>
    )
}

export default Challenges;