import IStakedLuna from "../types/Terra";
import axios from "axios";
import { url } from "inspector";

const getAllStakedLuna = () => {
    return axios.get<IStakedLuna[]>
        ("https://api.flipsidecrypto.com/api/v2/queries/c150c128-8b00-4aa5-9a25-addd71a864fc/data/latest")
}

const TerraService = {
    getAllStakedLuna
}

export default TerraService;