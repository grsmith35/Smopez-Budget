import { gql } from '@apollo/client';

export const QUERY_ACCOUNT = gql`
    query getAccount($_id: ID!) {
        getAccount(_id: $_id) {
            _id
            name
            email
            balance
            pays {
                _id
                amount
                name
                source
                consistency
            }
            bills {
                _id
                amount
                automated
                source
                name
                date
            }
            budgets {
                _id
                amount
                name
                timePeriod
            }
        }
    }
`;