import { useReducer } from "react";
import { UPDATE_ACCOUNT, UPDATE_ACCOUNT_ID } from "./actions";

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
    }
}

export function useBudgetReducer(initialState) {
    return useReducer(reducer, initialState)
}