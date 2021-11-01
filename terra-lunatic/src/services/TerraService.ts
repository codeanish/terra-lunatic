import axios from "axios";
import { ChallengeScore } from "../shared/types";

const getChallengeScores = (address: string) => {
    return axios.get<ChallengeScore[]>
    (`http://localhost:5000/address/${address}/scores`)
}

const getChallengeCateogies = () => {
    return axios.get<ChallengeScore[]>
    (`http://localhost:5000/scores`)
}

const TerraService = {
    getChallengeScores,
    getChallengeCateogies
}

export default TerraService;