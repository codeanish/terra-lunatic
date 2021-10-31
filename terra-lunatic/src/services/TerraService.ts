import axios from "axios";

const getStakedLuna = (address: string) => {
    return axios.get<number>
    (`http://localhost:5000/address/${address}/stakedluna`)
}

const getGovernanceVotes = (address: string) => {
    return axios.get<number>
    (`http://localhost:5000/address/${address}/governancevotes`)
}

const getUstDepositsToAnchor = (address: string) => {
    return axios.get<number>
    (`http://localhost:5000/address/${address}/ustdeposits`)
}

const getuLPDepositsToPylon = (address: string) => {
    return axios.get<number>
    (`http://localhost:5000/address/${address}/pylonmimeustdeposits`)
}

const TerraService = {
    getStakedLuna,
    getGovernanceVotes,
    getUstDepositsToAnchor,
    getuLPDepositsToPylon
}

export default TerraService;