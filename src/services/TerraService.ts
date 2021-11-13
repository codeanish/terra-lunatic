import { LCDClient, MsgVote } from "@terra-money/terra.js";
import axios from "axios";
import { ChallengeScore } from "../shared/types";

const url = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000'

const getChallengeScores = (address: string) => {
    return axios.get<ChallengeScore[]>
    (url + `/address/${address}/scores`)
}

const getChallengeCateogies = () => {
    return axios.get<ChallengeScore[]>
    (url + `/scores`)
}

const terra = new LCDClient({
    URL: 'https://lcd.terra.dev',
    chainID: 'columbus-5'
});

const getStakedDelegations = (address: string) => {
    return terra.staking.delegations(address)
}

const getTotalTransactions = (address: string) => {
    return terra.tx.search({"message.sender": address, "limit": 1})
}

const getTransactions = (address: string, limit: number, page: number) => {
    return terra.tx.search({"message.sender": address, "limit": limit, "page": page})
}

const TerraService = {
    getChallengeScores,
    getChallengeCateogies,
    getStakedDelegations,
    getTotalTransactions,
    getTransactions
}

export default TerraService;