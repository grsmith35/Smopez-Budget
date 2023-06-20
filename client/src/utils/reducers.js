import { useReducer } from "react";
import { UPDATE_ACCOUNT, UPDATE_ACCOUNT_ID, UPDATE_ACCOUNT_BILLS } from "./actions";

export const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.account
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
                    ...state.account,
                    bills: action.bills
                }
            }
    }
}

export function useBudgetReducer(initialState) {
    return useReducer(reducer, initialState)
}