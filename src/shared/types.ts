import React from "react";
import {SvgIcon} from "@mui/material"

export interface ChallengeScore {
    score: number,
    name: string,
    description: string,
    complete: boolean,
    url: string,
    image: string
}

export interface Send {
    amount: string,
    contract: string,
    msg: string
}

export interface ExecuteSend{
    send: Send,
    sender: string
}