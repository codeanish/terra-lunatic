import React from 'react'
import { styled } from '@mui/material/styles';
import {LinearProgress, linearProgressClasses} from '@mui/material'
import { Box } from '@mui/system';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

export interface Props{
    value: number;
}

const LinearValueIndicator = (props: Props) => {
    return (
        <Box sx={{flexGrow:1}}>
            <BorderLinearProgress variant="determinate" value={props.value}/>
        </Box>
    )
}

export default LinearValueIndicator;