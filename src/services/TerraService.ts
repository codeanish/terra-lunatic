import { LCDClient} from "@terra-money/terra.js";

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
    getStakedDelegations,
    getTotalTransactions,
    getTransactions
}

export default TerraService;