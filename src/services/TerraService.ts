import axios from "axios";
import { ChallengeScore } from "../shared/types";

const getChallengeScores = (address: string) => {
    return axios.get<ChallengeScore[]>
    (process.env.REACT_APP_API_URL + `/address/${address}/scores`)
}

const getChallengeCateogies = () => {
    return axios.get<ChallengeScore[]>
    (process.env.REACT_APP_API_URL + `/scores`)
}

const TerraService = {
    getChallengeScores,
    getChallengeCateogies
}

export default TerraService;