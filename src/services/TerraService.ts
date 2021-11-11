import { LCDClient } from "@terra-money/terra.js";
import axios from "axios";
import { BorrowerInfo, ChallengeScore } from "../shared/types";

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

const getAnchorBorrowing = (address: string) => {
    const contractAddress = 'terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s';
    
    return terra.wasm.contractQuery<BorrowerInfo>(
        contractAddress, 
        {borrower_info: {
            borrower: address,
          }})
}

const TerraService = {
    getChallengeScores,
    getChallengeCateogies,
    getAnchorBorrowing
}

export default TerraService;