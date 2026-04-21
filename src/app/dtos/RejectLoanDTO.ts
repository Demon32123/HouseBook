export type RejectLoanDTO = {
    id: number,
    status: string,
    canApprove: boolean,
    canReject: boolean,
    resolutionLabel: string
} 