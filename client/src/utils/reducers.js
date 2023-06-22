import { useReducer } from "react";
import { UPDATE_ACCOUNT, UPDATE_ACCOUNT_ID, UPDATE_ACCOUNT_BILLS, UPDATE_ACCOUNT_PAYS, UPDATE_ACCOUNT_BUDGETS } from "./actions";

export const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: action?.account
            }
        case UPDATE_ACCOUNT_ID:
            return {
                ...state,
                accountId: action.accountId
            }
        case UPDATE_ACCOUNT_BILLS:
            return {
                ...state,
                account: {
                    ...state?.account,
                    bills: action.bills
                }
            }
        case UPDATE_ACCOUNT_PAYS:
            return {
                ...state,
                account: {
                    ...state?.account,
                    pays: action.pays
                }
            }
        case UPDATE_ACCOUNT_BUDGETS:
            return {
                ...state,
                account: {
                    ...state?.account,
                    budgets: action.budgets
                }
            }
    }
}

export function useBudgetReducer(initialState) {
    return useReducer(reducer, initialState)
}