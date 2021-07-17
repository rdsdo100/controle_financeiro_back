export interface IAccounts {
    id: number;
    nameAccount: string;
    valueAccount: number;
    userIdFk: number;
    bankIdFk: number;
    created_at: Date;
    updated_at: Date;
}
