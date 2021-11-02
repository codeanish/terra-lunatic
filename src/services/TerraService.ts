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

const TerraService = {
    getChallengeScores,
    getChallengeCateogies
}

export default TerraService;