export interface ChallengeScore {
    score: number,
    name: string,
    description: string,
    complete: boolean
}

export interface BorrowerInfo {
    borrower: string,
    interest_index: string,
    loan_amount: number,
    pending_rewards: string,
    rewards_index: string
}